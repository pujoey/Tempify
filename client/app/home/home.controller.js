'use strict';

(function() {

class HomeController {

  constructor($http, $scope, socket, Auth, $cookies) {
    this.$http = $http;
    this.myToken = {};
    this.awesomeThings = [];


    // this.$http.get('http://localhost:3000/api/getNestToken').then(function(res) {
    //   $cookies.put('nest_token', res.data.token);
    //   console.log(res.data.token);
    // });

    //Auth implmentation for ng-hide on jumbotron
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

/*
 * Event Source Implmentation
 */

    // The Nest API will emit events from this URL.
    var NEST_API_URL = 'https://developer-api.nest.com';

    if (!window.EventSource) {
      alert('Your browser does not support EventSource. Try another browser.');
      throw new Error('Your browser does not support EventSource.');
    }

    // Get auth token from cookie.
    var token = $cookies.get('nest_token');

    //remove after testing
    console.log(token);

/**
 * Create an EventSource object which handles the long-running GET request to
 * the Nest REST Streaming API. The EventSource object emits events as they are
 * published by the API.
 */
    var source = new EventSource(NEST_API_URL + '?auth=' + token);


    /**
     * The 'put' event is received when a change is made to any of the Nest devices.
     * This callback will render all of the new device states to the browser.
     */
    source.addEventListener('put', function(e) {

      console.log(e.data);

      var data = JSON.parse(e.data).data || {};
      var devices = data.devices || {};
      var thermostats = devices.thermostats || {};
      var smokeAlarms = devices.smoke_co_alarms || {};
      var cameras = devices.cameras || {};
      var structures = data.structures || {};

      var structureArr = Object.keys(structures).map(function(id) {
        var thermostatIds = structures[id].thermostats || [];
        var smokeAlarmIds = structures[id].smoke_co_alarms || [];
        var cameraIds = structures[id].cameras || [];


         console.log(thermostatIds);
        $scope.name = structures[id].name;
        $scope.away = structures[id].away;
        // $scope.thermostats = thermostatIds.map(function(id) { return thermostats[id]; })



        return {
          name: structures[id].name,
          away: structures[id].away,
          thermostats: thermostatIds.map(function(id) { return thermostats[id]; }),
          smokeAlarms: smokeAlarmIds.map(function(id) { return smokeAlarms[id]; }),
          cameras: cameraIds.map(function(id) { return cameras[id]; })
        };


      });

      // $('#content').html($.templates('#structureTemplate').render(structureArr));
    });

    /**
     * When the authentication token is revoked, log out the user.
     */
    source.addEventListener('auth_revoked', function(e) {
      window.location = '/auth/logout';
    });

    /**
     * The 'open' event is emitted when a connection is established with the API.
     */
    source.addEventListener('open', function(e) {
      console.log('Connection opened!');
      // $('#connect-state-img').attr('src', '/img/green-state.png');
    }, false);

    /**
     * The 'error' event is emitted when an error occurs, such as when the connection
     * between the EventSource and the API is lost.
     */
    source.addEventListener('error', function(e) {
      if (e.readyState == EventSource.CLOSED) {
        console.error('Connection was closed! ', e);
      } else {
        console.error('An error occurred: ', e);
      }
      // $('#connect-state-img').attr('src', '/img/red-state.png');
    }, false);


  }

}

angular.module('tempifyApp')
  .controller('HomeController', HomeController);

})();
