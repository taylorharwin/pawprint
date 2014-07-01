'use strict';

angular.module('user', [
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ngCookies',

  'user.common',
  'user.landing',
  'user.main',
  'user.pet',
  'user.profile'
  ])

  .config(function ($locationProvider, $urlRouterProvider) {
    
    // routes to default state if none provided
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    // $locationProvider.html5Mode(true);

  })

  // @NOTE Restangular simply falls back to _httpConfig, so we edit it here
  .factory('authInterceptor', function ($rootScope, $q, AuthService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (AuthService.getCookie().loggedin) {
          config.headers.Authorization = 'Bearer ' + AuthService.getCookie().token;
        }
        return config;
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          $rootScope.$state.go('public'); // Will default to landing
        }
        return $q.reject(rejection);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  // always allow access to $state and $stateParams from $rootScope
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });