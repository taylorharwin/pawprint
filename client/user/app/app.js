'use strict';

angular.module('user', [
  'ui.router',
  'ui.bootstrap',
  'restangular',

  'user.common',
  'user.enter',
  'user.landing',
  'user.main',
  'user.pet',
  'user.profile'
]);

angular.module('user')
  .config(function ($locationProvider, $urlRouterProvider) {
    
    // routes to default state if none provided
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    // disabled to run locally with SimpleHTTPServer
    // $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });