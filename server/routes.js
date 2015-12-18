/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
var https = require('https');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));



  // Routes for NEST put request
  app.use('/nest/put', function (req, res) {
    var options = {
      hostname: 'developer-api.nest.com',
      path: '/devices/thermostats/' + req.body.id,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer c.JKuHPbifNKwLupVviJIASqfmDwHxfUK34G0hOiqBMY18TS7Ds7YOZQYeIAqDsMAqSMKWigVuLqE15K8OBca4TRrOGUR5EtIZjRiKzSAvV1d9Aj4f87bx87ey5gZ6jzRYL9uxsWRtBapjkfUy"
      }
    };

      var any = https.request(options, function (res) {

      });

     // write data to request body
     any.write(req.body.target_temperature_f);
     any.end();


  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
