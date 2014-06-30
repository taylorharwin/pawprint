'use strict';
/*global angular*/

angular.module('admin.eachRequest.controllers')
  .controller('EachRequestCtrl', function ($scope, $http, reqIDFactory, CurrentAdminService, AuthService, userService, petService, vetService, alertsService, vaccineService, formattingService, statusCodeConst) {

    //links scope to generic Services
    $scope.formattingService = formattingService;
    $scope.alertsService = alertsService;
    $scope.petService = petService;
    $scope.vetService = vetService;
    $scope.vaccineService = vaccineService;
    $scope.userService = userService;
    $scope.AuthService = AuthService;
    $scope.CurrentAdminService = CurrentAdminService;

    //sets all values necessary for display of the page
    $scope.reqID = reqIDFactory.getRequestID();
    $scope.vetID = reqIDFactory.getVetID();
    $scope.userID = reqIDFactory.getPetID();
    $scope.petID = reqIDFactory.getUserID();
    $scope.reqStatus = reqIDFactory.getRequestStatus();
    $scope.statusCodes = statusCodeConst;
    $scope.setClassOnRequest = reqIDFactory.setClassforStatus;

    //immediately gets all vaccines, which are necessary for display of the page
    $scope.vaccineService.getAllVaccines(1).then(function (data) {
      $scope.allVaccines = data;
    });

    //Initialize alerts as an empty array (for when there may have been alerts for a different request);
    $scope.alertsService.alerts = [];

    $scope.vetService.getPDFRecords(1, $scope.reqID).then(function (data) {
      $scope.allPDFs = data;
    });

    //Variable for two-way binding with request status dropdown
    $scope.statusObj = {name: $scope.reqStatus};

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
    $scope.postUpdatedStatus = function (status) {
      var packet = {status: status.name};
      console.log('Sending this',  packet);
      reqIDFactory.updateRequestStatus(1, $scope.reqID, packet).then(function () {
        $scope.statusObj.name = status.name;
        var msg = 'Status updated to ' + $scope.statusObj.name;
        $scope.alertsService.add('success', msg);
      });
    };

    $scope.filesChanged = function (elm) {
      $scope.files = elm.files;
      $scope.$apply();
    };

    $scope.upload = function () {
      var fd = new FormData();
      angular.forEach($scope.files, function (file) {
        fd.append('file', file);
      });

      $http({
        method: 'POST',
        url: '/admin/1/requests/' + $scope.reqID + '/pdfs',
        data: fd,
        headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        })
        .success(function (data) {
          console.log($scope.files);
          console.log('Files Sent!:', data);
        })
        .error(function (data) {
          console.log('something went wrong', data);
        });
    };

  });