angular.module('user.main.controllers')

  .controller('MainCtrl', function ($scope, CurrentUserService, CurrentPetService, VaccineService) {
    console.log($scope);
    console.log(CurrentUserService.getUser());

    $scope.VaccineService = VaccineService;
    $scope.CurrentPetsService = CurrentPetsService;
    
    $scope.userId = CurrentUserService.getUser().id;
    $scope.CurrentPetsService.retrievePets($scope.userId);
    
    $scope.pets = CurrentPetsService.getPets();
    
  });
