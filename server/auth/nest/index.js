'use strict';

import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('nest', {
    failureRedirect: '/',
    session: false
  }))

  .get('/callback', passport.authenticate('nest', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
