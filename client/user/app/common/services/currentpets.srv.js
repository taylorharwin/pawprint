angular.module('user.common.services')

  .service('CurrentPetsService', function ($q, PetRESTService, VaccineService, Restangular, $modal) {

    var pets = {
      pets: [],
      vaccines: [],
      requests: []
    };

    function retrievePets (userId) {

      PetRESTService.getPets(userId)
        .then(function (petsResult) {

          pets.pets = petsResult;
          var vaccinePromises = [];

          angular.forEach(pets.pets, function (pet) {
            var deferred = $q.defer();
            PetRESTService.getPetVaccines(userId, pet.id)
              .then(function (response) {
                deferred.resolve(response);
              }, function (error) {
                deferred.reject();
              });
            vaccinePromises.push(deferred.promise);
          });

          return $q.all(vaccinePromises);
        })
        .then(function (vaccinesResult) {

          pets.vaccines = vaccinesResult;
          var requestPromises = [];

          angular.forEach(pets.pets, function (pet) {
            var deferred = $q.defer();
            PetRESTService.getPetRequests(userId, pet.id)
              .then(function (response) {
                deferred.resolve(response);
              }, function (error) {
                deferred.reject();
              });
            requestPromises.push(deferred.promise);
          });
      
          return $q.all(requestPromises);
        })
        .then(function (requestsResult) {

          pets.requests = requestsResult;

        });
    }

    function getPets () {
      return pets;
    }

    function cancelRequest (userId, petIndex, requestIndex) {
      PetRESTService.cancelPetRequest(userId, pets.pets[petIndex].id, pets.requests[petIndex][requestIndex])
        .then(function (response) {
          pets.requests[petIndex].splice(requestIndex, 1);
        }, function (error) {
          console.log(error);
        });
    }

    function addPet (userId) {

      var modalInstance = $modal.open({
        templateUrl: 'app/pet/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return {};
          }
        }
      });

      modalInstance.result.then(function (pet) {
        console.log(pet);
        PetRESTService.postPet(userId, pet).then(function (petResponse) {
          console.log('successfully created pet');
          console.log(petResponse);
          pets.pets.push(petResponse);
          PetRESTService.getPetVaccines(userId, petResponse.id)
            .then(function (response) {
              pets.vaccines.push(response);
            }, function (error) {
              console.log(error);
            });
          PetRESTService.getPetRequests(userId, petResponse.id)
            .then(function (response) {
              pets.requests.push(response);
            }, function (error) {
              console.log(error);
            });
        }, function (error) {
          console.log(error);
        });
      });
    }

    function editPet (userId, index) {
    
      console.log(pets.pets[index]);
      var modalInstance = $modal.open({
        templateUrl: 'app/pet/templates/editpet.tpl.html',
        controller: 'EditPetCtrl',
        resolve: {
          pet: function () {
            return Restangular.copy(pets.pets[index]);
          }
        }
      });

      modalInstance.result.then(function (pet) {
        console.log(pet);
        pet.put().then(function (response) {
          console.log(response);
          pets.pets[index] = response;
        }, function (error) {
          console.log(error);
        });
      }, function () {
        console.log('Modal dismissed');
      });

    }

    function updatePet (userId, index) {

      var modalInstance = $modal.open({
        templateUrl: 'app/pages/templates/updatepet.tpl.html',
        controller: 'UpdatePetCtrl',
        resolve: {
          pet: function () {
            return pets.pets[index];
          }
        }
      });

      modalInstance.result.then(function (request) {
        PetRESTService.postPetRequest(request.userId, request.petId, request).then(function (response) {
          console.log('successfully sent pet update request');
          console.log(pets.requests, 'requests');
          pets.requests[index].push(response);
          console.log(pets.requests[index], 'PET REQUESTS.....');
        }, function (error) {
          console.log(error);
        });
      });

    }

    this.retrievePets = retrievePets;
    this.getPets = getPets;
    this.cancelRequest = cancelRequest;
    this.addPet = addPet;
    this.editPet = editPet;
    this.updatePet = updatePet;

  });