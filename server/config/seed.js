/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: "It's too damn hot in here",
      info: 'Comment by Joey Lin'
    }, {
      name: "Why is it freezing in here when it's 85 degree out?",
      info: 'Comment by Jeffrey'
    }, {
      name: "I'm wearing 3 layers and it's still cold. Please turn up the thermostat!!!",
      info: 'Comment by TACO'
    }, {
      name: "The fan is blowing right in my FACE!!!",
      info: 'Comment by Josh'
    }, {
      name: "Can somebody do something about the humidity in here? I am soaked...",
      info: 'Comment by Jesse'
    }, {
      name: "Tomorrow there's no class, remember to turn the AC off to save energy",
      info: 'Comment by Jim'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
