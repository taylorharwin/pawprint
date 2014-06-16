angular.module('user.pages.controllers')

  .controller('MainCtrl', function ($scope, UserFactory, VaccineFactory) {
    console.log($scope);

    $scope.checkExpiry = VaccineFactory.checkExpiry;

    //@NOTE actual functions
    // $scope.user = UserFactory.getUser(userId);
    // $scope.pets = UserFactory.getUserPets($scope.user.id, $scope.pet);

    //@NOTE dummy functions
    $scope.user = UserFactory.getUser();
    $scope.pets = UserFactory.getUserPets();
    
    $scope.setUserPetUpdate = function (petId) {
      UserFactory.setUserPetUpdate(petId, $scope.user.user.id);
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === petId) {
          $scope.pets[i].status.update = 'pending';
        }
      }
    };

    $scope.cancelUserPetUpdate = function(petId) {
      UserFactory.cancelUserPetUpdate(petId, $scope.user.user.id);
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === petId) {
          $scope.pets[i].status.update = 'normal';
        }
      }
    };

    $scope.setUserPetEdit = function (petId) {
      UserFactory.setUserPetEdit(petId, $scope.user.user.id);
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === petId) {
          $scope.pets[i].status.update = 'pending';
          $scope.pets[i].edit = false;
        }
      }
      //@NOTE will this be too fast and the db wont update in time?
      $scope.pets = UserFactory.getUserPets();
    };

    $scope.startUserPetEdit = function (petId) {
      for (var i=0; i<$scope.pets.length ; i++) {
        if ($scope.pets[i].pet.id === petId) {
          $scope.pets[i].edit = true;
        }
      }
    };

    $scope.addPetEntry = function () {
      // @TODO make this in editing mode immediately
      // then send to server only when save is clicked
      // (maybe with .save() in restangular)
      // then refresh all pets => db remain source of truth
      var newPet = {
        pet: {
          id: '123',
          name: 'Apple',
          birthdate: '2010-03-19',
          gender: 'F',
          breed: 'maltese-poodle',
          color: 'cream',
          weight: '5lb',
          neuter: true,
          microchip: '1CWR4465HS424342EQ',
          profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
        },
        vaccine: [
          {
            id: '456',
            name: 'bordetella',
            expiration: '3years',
            dateAdministered: '2013-10-09',
            dateExpired: '2014-10-09'
          }
        ],
        status: {
          vaccine: 'active',
          update: 'normal'
        },
        edit: false
      };
      $scope.pets.push(newPet);
    };

  });