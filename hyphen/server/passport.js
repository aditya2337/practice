const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Pid = require('puid');
const ObjectId = require('mongodb').ObjectId;
const generator = require('generate-password');

const User = require('./models/UserModel');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const getEmail = profile => {
  let email = null;
  if (profile.emails && profile.emails.length) {
    email = profile.emails[0].value;
  } else if (profile._json.emails && profile._json.emails.length) {
    email = profile._json.emails[0].value;
  }
  return email;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      const email = getEmail(profile);
      if (email !== null) {
        let image = profile._json.image.url;
        User.findOne({ email })
          .then(user => {
            if (user) return done(null, user);
            // if there is no user with that email
            // create the user
            const puid = new Pid();
            const uid = puid.generate('userId');
            const newUser = new User({
              email,
              avatar: image,
              uid,
              active: true,
              password: generator.generate({
                length: 16,
                number: true
              })
            });

            // save the user
            newUser.save()
              .then(newUser => done(null, newUser))
              .catch(err => { throw err; });
          })
      } else {
        console.log('error', profile);
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User
    .find({ _id: ObjectId(user.id) })
    .toArray((err, user) => {
      if (err) return done(null, false, { message: err });
      done(null, user);
    });
});
