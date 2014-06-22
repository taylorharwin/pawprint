'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory, statusCodeConst, $http) {

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

    //A generic GET function that gets used across all directives

    $scope.getStuff = function (adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log(path);
      $http.get(path)
      .success(callback)
      .error(function (data, status) {
        console.log('error making request:', data, status);
      });
    };
    //A generic POST function that gets used across all directives
    $scope.postStuff = function (obj, adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log(path);
      $http.post(path, obj)
      .success(callback)
      .error(function (data, status) {
        console.log('error posting data', data, status);
      });
    };


    // A Generic PUT functions that gets used across all directives
    $scope.submitStuff = function (obj, adminID, endPoint, extraID, callback, subPath) {
      var path;
      if (subPath) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString() + '/' + subPath.toString();
      } else if (extraID) {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString() + '/' + extraID.toString();
      } else {
        path = '/admin/' + adminID.toString() + '/' + endPoint.toString();
      }
      console.log('posting to', path);
      $http.put(path, obj)
      .success(callback)
      .error(function (data, status) {
        console.log('error making request:', data, status);
        $scope.alerts.push({type: 'danger', msg: 'There was an error trying to update'});

      });
    };
    //Takes an array of objects and a vacc name, returns the ID for that vaccine
    $scope.searchVaccinesArrayforID = function (arr, vaccineName) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === vaccineName) {
          return arr[i].id;
        }
      }
    };

    //iterates over array to change date objects into date strings
    $scope.cleanDates = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          var administered = new Date(arr[i].dateAdministered);
          var expires = new Date(arr[i].dateExpired);
          arr[i].dateAdministered = administered.toLocaleDateString();
          arr[i].dateExpired = expires.toLocaleDateString();
        }
        return arr;
      };

    //Gets all vaccines in database 
    $scope.getAllVaccines = function () {
      $http.get('/admin/1/vaccines')
      .success(function (json) {
        $scope.vaccines = json;
        console.log(json);
      })
      .error(function (data, status) {
        console.log('error making request:', data, status);
      });
    };


    //Posts a new global vaccine to database
    $scope.postNewVaccine = function (obj, callback) {
      $http.post('/admin/1/vaccines', obj)
      .success(callback)
      .error(function (data, status) {
        console.log('error making request:', data, status);
      });
    };

    //Gets all vaccination records for a given request. Gets called on page-load, and when a new record is added
    $scope.getAllVaccinesForRequest = function () {
      $scope.getStuff(1, 'requests', $scope.reqID, function (data) {
        $scope.vaccinations = $scope.cleanDates(data);
      }, 'vaccines');
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
  