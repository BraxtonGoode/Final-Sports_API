const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/volleyball', require('./volleyball'));
router.use('/soccer', require('./soccer'));
router.use('/basketball', require('./basketball'));
router.use('/user', require('./user'));

// login and logout routes
router.get(
  '/login',
  /* 
    #swagger.tags = ['Authentication']
    #swagger.description = 'Login with GitHub'
    #swagger.responses[200] = {
      description: 'You are logged in.'
    }
    #swagger.responses[404] = {
      description: 'You are not Logged in.'
    }
  */ passport.authenticate('github')
);

router.get(
  '/logout',
  /* 
    #swagger.tags = ['Authentication']
    #swagger.description = 'Logging out from GitHub'
    #swagger.responses[200] = {
      description: 'You are logged out.'
    }
    #swagger.responses[404] = {
      description: 'You are not Logged out.'
    }
  */ (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);


module.exports = router;
