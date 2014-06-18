'use strict';

angular.module('admin.pages.controllers')
  .controller('MainCtrl', function ($scope, reqIDFactory, $state, $http) {

    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;


    $scope.requests = [{
      requestID: 1234,
      user: 'Taylor Harwin',
      pet: 'Wednesday',
      dateCreated: '11/7/1985',
      dateLastModified: '11/7/2014',
      statusCode: 'New'
    },
      {requestID: 5678,
      user: 'Jillian Underwood',
      pet: 'June',
      dateCreated: '8/3/2007',
      dateLastModified: '8/10/2008',
      statusCode: 'Cancelled'
    }
    ];

    $scope.setReqAndTransition = function (id, status) {
      reqIDFactory.setRequestID(id);
      reqIDFactory.setRequestStatus(status);
      $state.go('^.request');
    };

    $scope.getAllRequests = function (func) {
      $http.get('/admin/requests')
      .success(function (json) {
        console.log(json);
        $scope.requests = json;
        if (func) {
          func(json);
        }
      });
    };

  });