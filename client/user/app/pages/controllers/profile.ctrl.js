'use strict';

angular.module('user.pages.controllers')
  .controller('ProfileCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.userId = CurrentUserFactory.getUserId();
    console.log($scope.userId);

    $scope.user = UserFactory.getUser($scope.userId);
    console.log($scope.user);

    $scope.setUserEdit = UserFactory.setUserEdit;

  });