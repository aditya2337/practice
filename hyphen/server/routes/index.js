var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const passport = require('passport');

const jwtSecret = process.env.JWT_SECRET;
const UserController = require('../Controllers/UserController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/confirm', UserController.confirm);
router.put('/update', jwt({ secret: jwtSecret }), UserController.updateEmail);
router.get('/auth/google/start', UserController.googleLogin);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/v1/callback'
  }),
  UserController.redirectFromGoogle
);
router.get('/callback', UserController.callback);
router.get('/return/user', jwt({ secret: jwtSecret }), UserController.returnUser);

module.exports = router;
