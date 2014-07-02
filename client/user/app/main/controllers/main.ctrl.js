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
        // Set default profilePic if none exists, todo: move this logic to the server
        for (var pet = 0; pet < pets.pets.length; pet++) {
          if(!pets.pets[pet].profilePic) {
            pets.pets[pet].profilePic = 'assets/img/default.jpeg';
          }
        }
        console.log(pets)
        $scope.pets = pets;
      });

  });
