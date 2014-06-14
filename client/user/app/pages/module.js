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
    .state('public', {
      abstract: true,
      url: '/',
      template: '<div ui-view class="realm"></div>'
    })

    .state('public.home', {
      url: '',
      templateUrl: 'app/pages/templates/home.tpl.html',
      controller: 'HomeCtrl'
    })

    .state('public.login', {
      url: 'login',
      templateUrl: 'app/pages/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('public.signup', {
      url: 'signup',
      templateUrl: 'app/pages/templates/signup.tpl.html',
      controller: 'SignupCtrl'
    })

    .state('app', {
      abstract: true,
      url: '/app',
      template: '<div ui-view class="container"></div>'
    })

    .state('app.main', {
      url: '',
      templateUrl: 'app/pages/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('app.profile', {
      url: '^/profile',
      templateUrl: 'app/pages/templates/profile.tpl.html',
      controller: 'ProfileCtrl'
    });

  });

angular.module('user.pages.controllers', ['ui.bootstrap']);
angular.module('user.pages.directives', []);
angular.module('user.pages.services', []);