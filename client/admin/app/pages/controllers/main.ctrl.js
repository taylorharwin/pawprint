'use strict';

angular.module('admin.pages.controllers')
  .controller('MainCtrl', function ($scope, reqIDFactory, $state, $http) {

// adds CSS styling based on the status of the request

    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

    $scope.cleanDates = function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var created = new Date(arr[i].created_at);
        var updated = new Date(arr[i].updated_at);
        arr[i].created_at = created.toLocaleDateString();
        arr[i].updated_at = updated.toLocaleDateString();
      }
      return arr;
    };


// Calls setter functions for all values in requests which are needed to make request-specific GET requests

    $scope.setReqAndTransition = function (reqID, vetID, userID, petID, status) {
      reqIDFactory.setRequestID(reqID);
      reqIDFactory.setVetID(vetID);
      reqIDFactory.setPetID(userID);
      reqIDFactory.setUserID(petID);
      reqIDFactory.setRequestStatus(status);
      $state.go('^.request');
    };

// Function for getting all existing requests to display on Main page. 

    $scope.getAllRequests = function (func) {
      $http.get('/admin/1/requests')
      .success(function (json) {
        $scope.cleanDates(json);
        $scope.requests = json;
        console.log($scope.requests);
        if (func) {
          func(json);
        }
      })
      .error(function (data, status, headers, config) {
        console.log('error', data, status);
      });
    };
//Loads all existing requests. TODO: Add sorting for admin, and eventually pagination when we have many requests
    $scope.getAllRequests();
  });