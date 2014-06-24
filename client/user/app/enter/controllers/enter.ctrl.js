angular.module('user.enter.controllers')

  .controller('EnterCtrl', function ($scope, CurrentUserService) {
    console.log($scope);
    
    $scope.CurrentUserService = CurrentUserService;

  });