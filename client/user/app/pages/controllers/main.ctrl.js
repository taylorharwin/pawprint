angular.module('user.pages.controllers')

  .controller('MainCtrl', function ($scope, UserFactory, VaccineFactory, CurrentUserFactory) {
    console.log($scope);
    console.log(CurrentUserFactory.getUserId());

    $scope.checkExpiry = VaccineFactory.checkExpiry;
    $scope.userId = CurrentUserFactory.getUserId();

    UserFactory.getUserPets($scope.userId).then(function (pets) {
      for (var i=0; i<pets.length; i++) {
        pets[i].edit = false;
      }
      $scope.pets = pets;
    });

    $scope.petEdit = function (id) {
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === id) {
          $scope.pets[i].edit = true;
        }
      }
    };

    $scope.savePetEdit = function (id, newPet) {
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === id) {
          $scope.pets[i].put().then (function () {
            $scope.pets[i].status.update = 'pending';
            $scope.pets[i].edit = false;
          }, function (response) {
            console.log('Error with response status code', response.status);
          });
        }
      }
    };

    $scope.petUpdate = function (id) {
      UserFactory.postPetUpdate(id, true).then(function () {
        for (var i=0; i<$scope.pets.length ; i++) {
          if ($scope.pets[i].pet.id === petId) {
            $scope.pets[i].status.update = 'pending';
          }
        }
        console.log('success update');
      }, function (response) {
        console.log('Error with response status code', response.status);
      });
    };

    $scope.cancelPetUpdate = function (id) {
      UserFactory.postPetUpdate(id, false).then(function () {
        for (var i=0; i<$scope.pets.length ; i++) {
          if ($scope.pets[i].pet.id === petId) {
            $scope.pets[i].status.update = 'normal';
          }
        }        
        console.log('success update');
      }, function (response) {
        console.log('Error with response status code', response.status);
      });
    };

    $scope.addPetEntry = function () {
      // @TODO make this in editing mode immediately
      // then send to server only when save is clicked
      // (maybe with .save() in restangular)
      // then refresh all pets => db remain source of truth
      var newPet = {
        pet: {
          name: '',
          birthdate: '',
          gender: '',
          breed: '',
          color: '',
          weight: '',
          neuter: '',
          microchip: '',
          profileUrl: ''
        },
        vaccine: [],
        status: {
          vaccine: 'active',
          update: 'pending'
        },
        edit: true,
        newPet: true
      };
      $scope.pets.push(newPet);
    };

    $scope.saveNewPet = function (data) {
      UserFactory.postPet(data).then(function () {
        var len = $scope.pets.length;
        delete $scope.pets[len-1].newPet;
      }, function (response) {
        $scope.pets.pop();
        console.log('Error with response status code', response.status);
      });
    };

  });


    //@NOTE actual functions
    // $scope.user = UserFactory.getUser(userId);
    // $scope.pets = UserFactory.getUserPets($scope.user.id, $scope.pet);
    
    // $scope.setUserPetUpdate = function (petId) {
    //   UserFactory.setUserPetUpdate(petId, $scope.user.user.id);
    //   for (var i=0; i<$scope.pets.length ; i++) {
    //     if ($scope.pets[i].pet.id === petId) {
    //       $scope.pets[i].status.update = 'pending';
    //     }
    //   }
    // };

    // $scope.cancelUserPetUpdate = function(petId) {
    //   UserFactory.cancelUserPetUpdate(petId, $scope.user.user.id);
    //   for (var i=0; i<$scope.pets.length ; i++) {
    //     if ($scope.pets[i].pet.id === petId) {
    //       $scope.pets[i].status.update = 'normal';
    //     }
    //   }
    // };

    // $scope.setUserPetEdit = function (petId) {
    //   UserFactory.setUserPetEdit(petId, $scope.user.user.id);
    //   for (var i=0; i<$scope.pets.length ; i++) {
    //     if ($scope.pets[i].pet.id === petId) {
    //       $scope.pets[i].status.update = 'pending';
    //       $scope.pets[i].edit = false;
    //     }
    //   }
    //   //@NOTE will this be too fast and the db wont update in time?
    //   $scope.pets = UserFactory.getUserPets();
    // };

    // $scope.startUserPetEdit = function (petId) {
    //   for (var i=0; i<$scope.pets.length ; i++) {
    //     if ($scope.pets[i].pet.id === petId) {
    //       $scope.pets[i].edit = true;
    //     }
    //   }
    // };