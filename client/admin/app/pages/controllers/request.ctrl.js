'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory) {

    $scope.reqID = reqIDFactory.getRequestID();
    
  });
  