'use strict';

angular.module('user', [
  'ui.router',

  'user.common',
  'user.pages'
]);

angular.module('user')
  .config(function ($locationProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    console.log($rootScope, 'rootScope');
    console.log($state, 'state');
    console.log('cheese');
  });