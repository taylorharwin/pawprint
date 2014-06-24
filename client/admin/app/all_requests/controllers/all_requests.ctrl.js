'use strict';

angular.module('admin.allRequests.controllers')
  .controller('AllRequestsCtrl', function ($scope, reqIDFactory, formattingService, $state, $http) {

    $scope.formattingService = formattingService;

// adds CSS styling based on the status of the request

    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

//iterates through an array and converts timestamp objects to user-friendly date strings.


// Calls setter functions for all values in requests which are needed to make request-specific GET requests

    $scope.setReqAndTransition = function (reqID, vetID, userID, petID, status) {
      reqIDFactory.setRequestID(reqID);
      reqIDFactory.setVetID(vetID);
      reqIDFactory.setPetID(userID);
      reqIDFactory.setUserID(petID);
      reqIDFactory.setRequestStatus(status);
      $state.go('app.eachRequest');
    };

// Gets all existing requests for display on Main page. 
    $scope.getAllRequests = function () {
      $http.get('/admin/1/requests')
      .success(function (json) {
        $scope.formattingService.cleanDates.call(json);
        $scope.requests = json;
        $scope.allRequestsCount = json.length;
      })
      .error(function (data, status, headers, config) {
        console.log('error', data, status);
      });
    };
//Loads all existing requests. TODO: Add sorting for admin, and eventually pagination when we have many requests
    $scope.getAllRequests();
  });