angular.module('user.pet.controllers')

  .controller('UpdatePetCtrl', function ($scope, AuthService, $modalInstance, pet) {

    var userId = AuthService.getCookie().userId;
    var petId = pet.id;
    $scope.request = {
      user_id: userId,
      pet_id: petId,
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