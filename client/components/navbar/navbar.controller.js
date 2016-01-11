'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Dashboard',
    'state': 'home'
  },
  {
    'title': 'Comments',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('tempifyApp')
  .controller('NavbarController', NavbarController);
