angular.module('user.landing.controllers')
  
  .controller('LandingCtrl', function ($scope, CurrentUserService) {
    console.log($scope);

    $scope.CurrentUserService = CurrentUserService;

  });