'use strict';
/*global angular*/

angular.module('admin.allRequests.controllers')
  .controller('AllRequestsCtrl', function ($scope, reqIDFactory, formattingService, $state, CurrentAdminService, AuthService) {

    $scope.formattingService = formattingService;
    $scope.reqIDFactory = reqIDFactory;
    $scope.AuthService = AuthService;
    $scope.CurrentAdminService = CurrentAdminService;

// adds CSS styling based on the status of the request
    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

// Calls functions for values within requests, which are needed to display "app.eachRequest" state
    $scope.setReqAndTransition = function (reqID, vetID, userID, petID, status) {
      $scope.reqIDFactory.setRequestID(reqID);
      $scope.reqIDFactory.setVetID(vetID);
      $scope.reqIDFactory.setPetID(userID);
      $scope.reqIDFactory.setUserID(petID);
      $scope.reqIDFactory.setRequestStatus(status);
      $state.go('app.eachRequest');
    };

// Gets all existing requests for display on Main page. 
    $scope.reqIDFactory.getAllRequests(AuthService.getCookie().userId).then(function (data) {
      $scope.formattingService.cleanDates.call(data);
      $scope.requests = data;
    });

  
   
  });