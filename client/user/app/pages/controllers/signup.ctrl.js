'use strict';

angular.module('user.pages.controllers')
  .controller('SignupCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.createUser = function() {
      UserFactory.setNewUser($scope.user).then(function(res){
        CurrentUserFactory.setUserId(res.id);
      });
    };
    
  });