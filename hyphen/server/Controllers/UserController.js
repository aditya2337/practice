const cloudinary = require('cloudinary');
const Pid = require('puid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const crypto = require('crypto');
const jwt = require('jwt-simple');
const passport = require('passport');

require('../passport');

// Email transporter for mandrill with the api key config.
var transport = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MANDRILL_API_KEY
  }
}));


const User = require('../models/UserModel');
const EmailConfirmations = require('../models/EmailConfirmations');

const UserController = {};
const puid = new Pid();

cloudinary.config({ 
  cloud_name: 'tutorial-finder', 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const sendUserTokenWithProfile = (user) => {
  const payload = {
    uid: user.uid,
    email: user.email,
    avatar: user.avatar
  }

  const token = jwt.encode(payload, process.env.JWT_SECRET);
  return {
    success: true,
    token,
    profile: {
      email: user.email,
      avatar: user.avatar
    }
  }
}


UserController.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(409).json({ success: false, error: 'not_found' });
      bcrypt.compare(password, user.password, (err, validUser) => {
        if (err) return next(err);
        if (validUser) {
          if (!user.active) {
           return res.status(409).json({ success: false, error: 'not_active' }); 
          }
          const response = sendUserTokenWithProfile(user);
          res.json(response);
        } else {
          res.status(409).json({ success: false, error: 'wrong_password' });
        }
      })
    })
    .catch(err => next(err));
}

const registerNewUser = (url, email, password) => {
  const uid = puid.generate('userId');
  const saltRounds = 10;
  const currentDate = (new Date()).valueOf().toString();
  const random = Math.random().toString();

  const uniqueHash = crypto.createHash('sha1').update(currentDate + random).digest('hex');

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      const newUser = new User({
        uid,
        email,
        password: hash,
        avatar: url
      });
  
      newUser.save()
        .then(usr => {
          transport.sendMail({
            from: 'connections@hyphenmail.com',
            to: email,
            subject: 'Confirm your mail',
            html: `
              <div>
                <h3>Welcome to Hyphen</h3>
                <p>Please confirm your mail to continue</p>
                <a href="${process.env.CLIENT_HOST}/login?id=${uniqueHash}" targert+"_blank">Confirm mail</a>
              </div>
            `
          }, (err, info) => {
            if (err) return reject(err);
            console.log(info);

            const newEmailConfirmation = new EmailConfirmations({
              uid: usr.uid,
              hash: uniqueHash
            });

            newEmailConfirmation.save()
              .then(() => {
                const response = sendUserTokenWithProfile(usr);
                resolve(response);
              })
              .catch(err => reject(err));
          })
        })
        .catch(err => reject(err));
    })
  });
}

UserController.signup = (req, res, next) => {
  const { file, email, password } = req.body;
  const defaultProfileImage = 'https://vignette.wikia.nocookie.net/recipes/images/1/1c/Avatar.svg/revision/latest?cb=20110302033947';

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) return res.status(409).json({ success: false, error: 'user_exists' });
      if (file && file.length > 0) {
        cloudinary.uploader.upload(file, result => {
          registerNewUser(result.url, email, password)
            .then(usr => {
              res.json(usr);
            })
            .catch(err => next(err));
        })
      } else {
        registerNewUser(defaultProfileImage, email, password)
          .then(usr => {
            res.json(usr);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
}

UserController.confirm = (req, res, next) => {
  const { id } = req.query;
  const findingQuery = { hash: id };
  EmailConfirmations.findOne(findingQuery)
    .then(pendingConfirmaion => {
      if (!pendingConfirmaion) return res.status(409).json({ success: false, error: 'link_expired' });
      User.findOneAndUpdate(
        { uid: pendingConfirmaion.uid },
        { active: true },
        { new: true }
      ).then(activatedUser => {
        EmailConfirmations.findOneAndRemove(findingQuery)
          .then(() => {
            const response = sendUserTokenWithProfile(activatedUser);
            res.json(response);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
    })
}

UserController.updateEmail = (req, res, next) => {
  const { email } = req.body;
  const { uid } = req.user;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) return res.status(409).json({ success: false, error: 'user_exists' });
      User.findOneAndUpdate(
        { uid },
        { $set: { email } },
        { new: true }
      ).then(updatedUser => {
        const response = sendUserTokenWithProfile(updatedUser);
        res.json(response);
      })
      .catch(e => next(e));
    })
    .catch(err => next(err));
}

UserController.googleLogin = (req, res, next) => {
  passport.authenticate('google', {
    scope: [ 'email', 'profile' ]
  })(req, res, next);
}

UserController.redirectFromGoogle = (req, res) => {
  const { user } = req;
  const payload = {
    uid: user.uid,
    email: user.email,
    avatar: user.avatar
  }

  const token = jwt.encode(payload, process.env.JWT_SECRET);
  res
    .status(200)
    .redirect(
      `${process.env.CLIENT_HOST}/login?token=${token}`
    );
};

UserController.callback = (req, res, next) => {
  res.status(200).redirect(`${process.env.CLIENT_HOST}/login?error=true`);
}

UserController.returnUser = (req, res, next) => {
  const { uid } = req.user;

  User.findOne({ uid })
    .then(user => {
      if (!user) return res.status(409).json({ success: false, error: 'not_found' });
      const response = sendUserTokenWithProfile(user);
      res.json(response);
    })
    .catch(err => next(err));
}

module.exports = UserController;