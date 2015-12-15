'use strict';

import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

var router = express.Router();

router
  .get('/auth/nest', passport.authenticate('nest', {
    failureRedirect: '/',
    session: false
  }))

  .get('/auth/nest/callback', passport.authenticate('nest', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
