angular.module('user.pages.controllers')

  .controller('MainCtrl', function ($scope, $modal, UserFactory, CurrentUserFactory, PetFactory, VaccineFactory, Restangular) {
    console.log($scope);
    console.log(CurrentUserFactory.getUserId());

    $scope.userId = CurrentUserFactory.getUserId();
    $scope.pets = [];
    $scope.vaccines = [];
    $scope.requests = [];
    $scope.checkExpiry = VaccineFactory.checkExpiry;

    PetFactory.getPets($scope.userId).then(function (pets) {
      $scope.pets = pets;

      for (var i=0; i<$scope.pets.length; i++){
        PetFactory.getPetVaccines($scope.userId, $scope.pets[i].id)
          .then(function (response) {
            $scope.vaccines.push(response);
          }, function (error) {
            console.log(error);
          });
        PetFactory.getPetRequests($scope.userId, $scope.pets[i].id)
          .then(function (response) {
            $scope.requests.push(response);
          }, function (error) {
            console.log(error);
          });
      }
    });
    
    $scope.cancelRequest = function (petIndex, requestIndex) {
      PetFactory.cancelPetRequest($scope.userId, $scope.pets[petIndex].id, $scope.requests[petIndex][requestIndex])
        .then(function (response) {
          $scope.requests[petIndex].splice(requestIndex, 1);
        }, function (error) {
          console.log(error);
        });
    };

    $scope.addPet = function () {

      var modalInstance = $modal.open({
        templateUrl: 'app/pages/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return {};
          }
        }
      });

      modalInstance.result.then(function (pet) {
        PetFactory.postPet($scope.userId, pet).then(function (petResponse) {
          console.log('successfully created pet');
          console.log(petResponse);
          $scope.pets.push(petResponse);
          PetFactory.getPetVaccines($scope.userId, petResponse.id)
            .then(function (response) {
              $scope.vaccines.push(response);
            }, function (error) {
              console.log(error);
            });
          PetFactory.getPetRequests($scope.userId, petResponse.id)
            .then(function (response) {
              $scope.requests.push(response);
            }, function (error) {
              console.log(error);
            });
        }, function (error) {
          console.log(error);
        });
      });

    };

    $scope.editPet = function (index) {
    
      console.log($scope.pets[index]);
      var modalInstance = $modal.open({
        templateUrl: 'app/pages/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return Restangular.copy($scope.pets[index]);
          }
        }
      });

      modalInstance.result.then(function (pet) {
        console.log(pet);
        pet.put().then(function (response) {
          console.log(response);
          $scope.pets[index] = response;
        }, function (error) {
          console.log(error);
        });
      }, function () {
        console.log('Modal dismissed');
      });

    };

    $scope.updatePet = function (index) {

      var modalInstance = $modal.open({
        templateUrl: 'app/pages/templates/updatepet.tpl.html',
        controller: 'UpdatePetCtrl',
        resolve: {
          pet: function () {
            return $scope.pets[index];
          }
        }
      });

      modalInstance.result.then(function (request) {
        PetFactory.postPetRequest(request.userId, request.petId, request).then(function (response) {
          console.log('successfully sent pet update request');
          console.log($scope.requests, 'requests');
          console.log(index, "INDEXXX!!!!");
          $scope.requests[index].push(response);
          console.log($scope.requests[index], 'PET REQUESTS.....');
        }, function (error) {
          console.log(error);
        });
      });

    };

  });


  //   $scope.petEdit = function (id) {
  //     for (var i=0; i<$scope.pets.length ; i++) {
  //       if ($scope.pets[i].pet.id === id) {
  //         $scope.pets[i].edit = true;
  //       }
  //     }
  //   };

  //   $scope.savePetEdit = function (id, newPet) {
  //     for (var i=0; i<$scope.pets.length ; i++) {
  //       if ($scope.pets[i].pet.id === id) {
  //         $scope.pets[i].put().then (function () {
  //           $scope.pets[i].status.update = 'pending';
  //           $scope.pets[i].edit = false;
  //         }, function (response) {
  //           console.log('Error with response status code', response.status);
  //         });
  //       }
  //     }
  //   };

  //   $scope.petUpdate = function (id) {
  //     UserFactory.postPetUpdate(id, true).then(function () {
  //       for (var i=0; i<$scope.pets.length ; i++) {
  //         if ($scope.pets[i].pet.id === petId) {
  //           $scope.pets[i].status.update = 'pending';
  //         }
  //       }
  //       console.log('success update');
  //     }, function (response) {
  //       console.log('Error with response status code', response.status);
  //     });
  //   };

  //   $scope.cancelPetUpdate = function (id) {
  //     UserFactory.postPetUpdate(id, false).then(function () {
  //       for (var i=0; i<$scope.pets.length ; i++) {
  //         if ($scope.pets[i].pet.id === petId) {
  //           $scope.pets[i].status.update = 'normal';
  //         }
  //       }        
  //       console.log('success update');
  //     }, function (response) {
  //       console.log('Error with response status code', response.status);
  //     });
  //   };

  //   $scope.addPetEntry = function () {
  //     // @TODO make this in editing mode immediately
  //     // then send to server only when save is clicked
  //     // (maybe with .save() in restangular)
  //     // then refresh all pets => db remain source of truth
  //     var newPet = {
  //       pet: {
  //         name: '',
  //         birthdate: '',
  //         gender: '',
  //         breed: '',
  //         color: '',
  //         weight: '',
  //         neuter: '',
  //         microchip: '',
  //         profileUrl: ''
  //       },
  //       vaccine: [],
  //       status: {
  //         vaccine: 'active',
  //         update: 'pending'
  //       },
  //       edit: true,
  //       newPet: true
  //     };
  //     $scope.pets.push(newPet);
  //   };

  //   $scope.saveNewPet = function (data) {
  //     UserFactory.postPet(data).then(function () {
  //       var len = $scope.pets.length;
  //       delete $scope.pets[len-1].newPet;
  //     }, function (response) {
  //       $scope.pets.pop();
  //       console.log('Error with response status code', response.status);
  //     });
  //   };

  // });


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