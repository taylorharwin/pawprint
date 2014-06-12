'use strict';

angular.module('admin.pages', [
  'ui.router',

  'admin.pages.controllers',
  'admin.pages.directives',
  'admin.pages.services'
]);

angular.module('admin.pages')
  .config(function ($stateProvider) {

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

angular.module('admin.pages.controllers', []);
angular.module('admin.pages.directives', []);
angular.module('admin.pages.services', []);