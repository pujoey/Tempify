'use strict';

angular.module('tempifyApp.auth', [
  'tempifyApp.constants',
  'tempifyApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
