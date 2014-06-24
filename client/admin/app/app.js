'use strict';

angular.module('admin', [
  'ui.router',
  'ui.bootstrap',
  'restangular',

  'admin.common',
  'admin.login',
  'admin.allRequests',
  'admin.eachRequest'
])
  .config(function ($locationProvider, $urlRouterProvider) {

    //routes to default state if none provided
    $urlRouterProvider.otherwise('/');

  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });