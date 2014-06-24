angular.module('user.pet.controllers')

  .controller('UpdatePetCtrl', function ($scope, $modalInstance, pet, CurrentUserService) {

    var userId = CurrentUserService.getUser().id;
    var petId = pet.id;
    $scope.request = {
      userId: $scope.userId,
      petId: $scope.pet.id,
      status: 'New'
    };
    
    $scope.ok = function () {
      console.log('updated');
      $modalInstance.close($scope.request);
    };

    $scope.cancel = function () {
      console.log('cancelled');
      $modalInstance.dismiss('cancel');
    };

  });