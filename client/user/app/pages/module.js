'use strict';

angular.module('user.pages', [
  'ui.router',

  'user.pages.controllers',
  'user.pages.directives',
  'user.pages.services'
]);

angular.module('user.pages')
  .config(function ($stateProvider) {

  // routing states, setting templates and controllers to use
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/pages/templates/home.tpl.html',
      controller: 'HomeCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/pages/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'app/pages/templates/signup.tpl.html',
      controller: 'SignupCtrl'
    })

    .state('main', {
      url: '/main',
      templateUrl: 'app/pages/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/pages/templates/profile.tpl.html',
      controller: 'ProfileCtrl'
    });

  });

angular.module('user.pages.controllers', []);
angular.module('user.pages.directives', []);
angular.module('user.pages.services', []);