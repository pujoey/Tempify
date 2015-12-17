import passport from 'passport';
import {Strategy as NestStrategy} from 'passport-nest';

exports.setup = function(User, config) {
  passport.use(new NestStrategy({
    clientID: config.nest.clientID,
    clientSecret: config.nest.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'nest.id': profile.id
    })
      .then(function(user) {
        // nestToken = accessToken;
        // console.log(nestToken);
        //need to set access token to
          // res.cookie("nest_toekn",accessToken);
        // console.log(nest_token);
        // window.localStorage.setItem("nest_token", accessToken);
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'admin',
            username: profile.emails[0].value.split('@')[0],
            provider: 'nest',
            nest: accessToken
            // nest: profile._json
          });
          user.saveAsync()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          user.nest = accessToken;
          user.save(function () {
            return done(null, user);
          });
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
