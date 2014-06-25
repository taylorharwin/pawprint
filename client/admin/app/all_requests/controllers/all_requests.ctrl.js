'use strict';

angular.module('admin.allRequests.controllers')
  .controller('AllRequestsCtrl', function ($scope, reqIDFactory, formattingService, $state, $http) {

    $scope.formattingService = formattingService;
    $scope.reqIDFactory = reqIDFactory;

// adds CSS styling based on the status of the request

    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

//iterates through an array and converts timestamp objects to user-friendly date strings.


// Calls setter functions for all values in requests which are needed to make request-specific GET requests

    $scope.setReqAndTransition = function (reqID, vetID, userID, petID, status) {
      $scope.reqIDFactory.setRequestID(reqID);
      $scope.reqIDFactory.setVetID(vetID);
      $scope.reqIDFactory.setPetID(userID);
      $scope.reqIDFactory.setUserID(petID);
      $scope.reqIDFactory.setRequestStatus(status);
      $state.go('app.eachRequest');
    };

// Gets all existing requests for display on Main page. 
    $scope.reqIDFactory.getAllRequests(1).then(function (data) {
      $scope.formattingService.cleanDates.call(data);
      console.log(data);
      $scope.requests = data;
    });

//Loads all existing requests. TODO: Add sorting for admin, and eventually pagination when we have many requests
   
  });