'use strict';

angular.module('admin.pages.controllers')
  .controller('MainCtrl', function ($scope, ReqID) {

    $scope.requests = [{
      RequestID: 1234,
      User: 'Taylor Harwin',
      Pet: 'Wednesday',
      DateCreated: '11/7/1985',
      DateLastModified: '11/7/2014',
      Status: 'Open'
    }];

    $scope.setReq = function (id) {
      console.log(id);
      ReqID.setRequestID(id)
    };

  });