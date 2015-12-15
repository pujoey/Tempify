'use strict';

(function() {

class HomeController {

  constructor($http, $scope, socket, Auth, $cookies) {
    this.$http = $http;
    this.myToken = {};
    this.awesomeThings = [];


    this.$http.get('http://localhost:3000/api/getNestToken').then(function(res) {
      $cookies.put('nest_token', res.data.token);
      console.log(res.data.token);
    });

    //Auth implmentation for ng-hide on jumbotron
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    // $http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   socket.syncUpdates('thing', this.awesomeThings);
    // });

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('tempifyApp')
  .controller('HomeController', HomeController);

})();
