'use strict';

angular.module('user.pages.controllers')
  .controller('SignupCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.createUser = function() {
      var userId = UserFactory.setNewUser($scope.user);
      CurrentUserFactory.setUserId(userId);
    };
    
  });