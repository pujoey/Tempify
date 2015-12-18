'use strict';

(function() {

class HomeController {

  constructor($http, $scope, socket, Auth, $cookies) {
    var vm = this;

    vm.weatherUpdated = false;  //run weather update once

    this.$http = $http;
    this.myToken = {};
    this.awesomeThings = [];

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
    // console.log(token);

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
      $scope.$apply(function() {
        vm.response = JSON.parse(e.data).data;

        var devices     = vm.response.devices     || {};
        var thermostats = devices.thermostats     || {};
        var smokeAlarms = devices.smoke_co_alarms || {};
        var cameras     = devices.cameras         || {};

        var structures   = vm.response.structures  || {};

        vm.structures = Object.keys(structures).map(function(id) {
          var name          = structures[id].name;
          var zip           = structures[id].postal_code;
          var deviceId      = structures[id].postal_code;
          var away          = structures[id].away;
          var thermostatIds = structures[id].thermostats     || [];
          var smokeAlarmIds = structures[id].smoke_co_alarms || [];
          var cameraIds     = structures[id].cameras         || [];

    /**
     * When the zip code is available, make api call to yahoo weather.
     */
        if (zip && (vm.weatherUpdated == false)) {
          updateWeather(zip);
          console.log("weather updated");
          vm.weatherUpdated = true;
        }


          return {
            name: name,
            away: away,
            thermostats: thermostatIds.map(function(id) { return thermostats[id]; }),
            smokeAlarms: smokeAlarmIds.map(function(id) { return smokeAlarms[id]; }),
            cameras:     cameraIds.map(function(id) { return cameras[id]; })
          };
        });
      });
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

    /**
     * Acquire outside weather data based on thermostat's zip code
     */
    vm.updateWeather = updateWeather;
    function updateWeather(zip) {
      $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + zip + '%22&format=json&diagnostics=true&callback=')
        .then(function(res) {
          vm.weather = res.data.query.results.channel;
          console.log(res.data.query.results.channel);
        });
    } //updateWeather

    /**
     * Update thermostat through put request to Nest
     */
     vm.updateThermo = updateThermo;
     function updateThermo(id, newTemp) {
      console.log("updateThermo ran", id, newTemp);
      console.log(angular.toJson({target_temperature_f: newTemp}));
      var buffer = angular.toJson({"target_temperature_f": newTemp, "id": id});
      $http({
        url: NEST_API_URL + "/devices/thermostats/" + id,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer c.JKuHPbifNKwLupVviJIASqfmDwHxfUK34G0hOiqBMY18TS7Ds7YOZQYeIAqDsMAqSMKWigVuLqE15K8OBca4TRrOGUR5EtIZjRiKzSAvV1d9Aj4f87bx87ey5gZ6jzRYL9uxsWRtBapjkfUy"
        },
        data: {"target_temperature_f": newTemp}
      }).then(function(res) {
        console.log(res.data);
      }, function(err) {
        console.log(err);
      });

     //   $http.put({
     //      url:     NEST_API_URL + "/devices/thermostats/" + id,
     //      method:  "PUT",
     //      headers: {
     //        "Content-Type": "application/json",
     //        "Authorization": "Bearer c.JKuHPbifNKwLupVviJIASqfmDwHxfUK34G0hOiqBMY18TS7Ds7YOZQYeIAqDsMAqSMKWigVuLqE15K8OBca4TRrOGUR5EtIZjRiKzSAvV1d9Aj4f87bx87ey5gZ6jzRYL9uxsWRtBapjkfUy"
     //      },
     //      data: buffer})
     //      .then(function(res) {
     //       console.log(res.data);
     //      });
     // }


  }

}

angular.module('tempifyApp')
  .controller('HomeController', HomeController);

})();
