'use strict';

angular.module('admin.pages.controllers')
  .controller('MainCtrl', function ($scope, reqIDFactory, $state) {

    $scope.requests = [{
      requestID: 1234,
      user: 'Taylor Harwin',
      pet: 'Wednesday',
      dateCreated: '11/7/1985',
      dateLastModified: '11/7/2014',
      status: 'Open'
    }];

    $scope.setReqAndTransition = function (id) {
      reqIDFactory.setRequestID(id);
      $state.go('^.request');
    };

  });
