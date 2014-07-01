angular.module('user.main.controllers')

  .controller('MainCtrl', function ($scope, AuthService, CurrentUserService, CurrentPetsService, VaccineService) {
    console.log($scope);

    $scope.VaccineService = VaccineService;
    $scope.CurrentPetsService = CurrentPetsService;
    CurrentUserService.retrieveUser(AuthService.getCookie().get('userId'))
      .then(function (user){
        $scope.user = user;
      });
    $scope.userId = AuthService.getCookie().get('userId');

    CurrentPetsService.retrievePets($scope.userId)
      .then(function(pets) {
        $scope.pets = pets;
      });

  });
