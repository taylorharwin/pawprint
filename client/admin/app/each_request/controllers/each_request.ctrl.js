'use strict';

angular.module('admin.eachRequest.controllers')
  .controller('EachRequestCtrl', function ($scope, reqIDFactory, userService, petService, vetService, alertsService, vaccineService, formattingService, statusCodeConst) {


    //links scope to generic Services
    $scope.formattingService = formattingService;
    $scope.alertsService = alertsService;
    $scope.petService = petService;
    $scope.vetService = vetService;
    $scope.vaccineService = vaccineService;
    $scope.userService = userService;

    //sets all values necessary for display of the page
    $scope.reqID = reqIDFactory.getRequestID();
    $scope.vetID = reqIDFactory.getVetID();
    $scope.userID = reqIDFactory.getPetID();
    $scope.petID = reqIDFactory.getUserID();
    $scope.reqStatus = reqIDFactory.getRequestStatus();
    $scope.statusCodes = statusCodeConst;
    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

    //Variable for two-way binding with request status dropdown
   
    $scope.code = {status: ''};

    //toggles whether or not a given dropdown menu is open

    $scope.status = {
      isopen: false
    };

 
    //Takes an array of objects and a vacc name, returns the ID for that vaccine
    $scope.searchVaccinesArrayforID = function (arr, vaccineName) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === vaccineName) {
          return arr[i].id;
        }
      }
    };

 
  //Change the status for a given request
    $scope.postUpdatedStatus = function (name) {
      $scope.code.status = name;
      console.log($scope.code);
      $scope.submitStuff($scope.code, 1, 'requests', $scope.reqID, function () {
        console.log('success!');
        $scope.alerts.push({ type: 'success', msg: 'Updated status to ' +  $scope.code.status});
        $scope.reqStatus = $scope.code.status;
      });
    };

//Array containing all alerts
    $scope.alerts = [];

     //Function to remove any one alert (Admins may have multiple alerts on screen for any requests);
    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

  });
  