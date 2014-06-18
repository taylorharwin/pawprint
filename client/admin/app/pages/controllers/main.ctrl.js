'use strict';

angular.module('admin.pages.controllers')
  .controller('MainCtrl', function ($scope, reqIDFactory, $state, $http) {

    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;



    $scope.setReqAndTransition = function (id, status) {
      reqIDFactory.setRequestID(id);
      reqIDFactory.setRequestStatus(status);
      $state.go('^.request');
    };

    $scope.getAllRequests = function (func) {
      $http.get('/admin/1/requests')
      .success(function (json) {
        console.log(json);
        $scope.requests = json;
        if (func) {
          func(json);
        }
      });
    };

    $scope.requests = $scope.getAllRequests();
    console.log($scope.requests);

  });