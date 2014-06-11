'use strict';

angular.module('user.pages', [
  'user.pages.controllers',
  'user.pages.directives',
  'user.pages.services'
]);

angular.module('user.pages')
  .config(function ($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/templates/home.tpl.html',
      controller: 'HomeCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'pages/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'pages/templates/signup.tpl.html',
      controller: 'SignupCtrl'
    })

    .state('main', {
      url: '/main',
      templateUrl: 'pages/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'pages/templates/profile.tpl.html',
      controller: 'ProfileCtrl'
    });

  });

angular.module('user.pages.controllers', []);
angular.module('user.pages.directives', []);
angular.module('user.pages.services', []);