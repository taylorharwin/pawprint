'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, ReqID) {

    $scope.reqID = ReqID.getRequestID();
    
  });