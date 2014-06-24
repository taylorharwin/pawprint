'use strict';

angular.module('admin')
  .config(function ($stateProvider) {

  $stateProvider
    .state('public', {
      abstract: true,
      url: '/',
      template: '<div ui-view class="realm"></div>'
    })
     .state('public.login', {
      url: '',
      templateUrl: 'app/login/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('app', {
      abstract: true,
      url: '/admin/app',
      template: '<div ui-view class="realm"></div>'
    })

    .state('app.allRequests', {
      url: '',
      templateUrl: 'app/all_requests/templates/all_requests.tpl.html',
      controller: 'AllRequestsCtrl'
    })

    .state('app.eachRequest', {
      url: '^/request',
      templateUrl: 'app/each_request/templates/request.tpl.html',
      controller: 'EachRequestCtrl'
    });

});
