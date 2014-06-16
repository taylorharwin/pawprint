'use strict';

angular.module('user.pages.controllers')
  .controller('ProfileCtrl', function ($scope, UserFactory) {
    console.log($scope);

    $scope.user = UserFactory.getUser();

    $scope.setUserEdit = UserFactory.setUserEdit;

  });