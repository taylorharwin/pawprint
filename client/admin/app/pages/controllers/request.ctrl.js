'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory, statusCodeConst) {

    $scope.reqID = reqIDFactory.getRequestID();
    $scope.reqStatus = reqIDFactory.getRequestStatus();
    $scope.statusCodes = statusCodeConst;
    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

    $scope.vaccines = [
      'Rabies',
      'Feline Leukemia',
      'Parvovirus',
      'Rabbit anti-depressant'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.editing = false;

    $scope.toggleEdit = function () {
      $scope.editing = !$scope.editing;
      };


  });
  