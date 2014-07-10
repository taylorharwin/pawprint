angular.module('user.main.controllers')

  .controller('MainCtrl', function ($scope, AuthService, CurrentUserService, CurrentPetsService, VetRESTService, VaccineService) {
    console.log($scope);

    $scope.VaccineService = VaccineService;
    
    $scope.userId = AuthService.getCookie().get('userId');

    CurrentUserService.retrieveUser($scope.userId)
      .then(function (user){
        $scope.user = user;
      });
    
    CurrentPetsService.retrievePets($scope.userId)
      .then(function(pets) {
        // TO BE REMOVED
        var statuses = ['active', 'expiring', 'expired'];
        // Set default profilePic if none exists, todo: move this logic to the server
        for (var pet = 0; pet < pets.pets.length; pet++) {
          if(!pets.pets[pet].profilePic) {
            pets.pets[pet].profilePic = 'assets/img/default.jpeg';
          }
          // FOR TESTING PURPOSES ONLY, REMOVE WHEN FUNCTIONALITY ADDED
          pets.pets[pet].vaccineStatus = statuses[Math.round(Math.random() * 2)];
        }
        $scope.pets = pets;
      });

    VetRESTService.retrieveVets()
      .then(function (vets) {
        $scope.vets = vets;
      });

  });
