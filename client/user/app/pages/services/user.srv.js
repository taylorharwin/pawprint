//=============================================
//@TODO split into user.srv.js && pet.srv.js
//=============================================

angular.module('user.pages.services')

  .factory('UserFactory', function (Restangular, $http){

    // var config = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }; 

    //@TODO test all the functions in this factory
    //@TODO use these functions to request API:
    function postUserSignup (data) {
      // return Restangular.all('user/signup').post(data);
      return Restangular.all('user').post(data);
    }

    function postUserLogin (data) {
      // return Restangular.all('user/login').post(data);
      console.log('inside postUserLogin...');
      console.log('data', data);
      return Restangular.all('user').post(data);
    }

    function getUser (id) {
      return Restangular.one('user', id).get();
    }

    function getUserPets (id) {
      return Restangular.one('user', id).all('pets').getList();
    }

    function getPet (id) {
      return Restangular.one('pet', id).get();
    }

    function postPet (data) {
      return Restangular.all('pet').post(data);
    }

    // function postPetUpdate (id, status) {
    //   var request = {
    //     update: status,
    //   };
    //   return Restangular.one('pet', id).post(request);
    // }

    return {
      postUserSignup: postUserSignup,
      postUserLogin: postUserLogin,
      getUser: getUser,
      getUserPets: getUserPets,
      getPet: getPet,
      postPet: postPet
      // postPetUpdate: postPetUpdate
    };

  });


    // function setNewUserPet (data) {
    //   var url = baseUrl + 'pet';
    //   $http.post(url, data, config);
    // }

    // function setUserEdit (userId, data) {
    //   console.log(userId, data, 'abc');
    //   Restangular.one('user', userId).get().then(function (user) {
    //     console.log(data, 'DATA');
    //     console.log(user, 'USER');
    //     user = data;
    //     user.put();
    //   }); 
    // }

    // function setUserPetEdit (userId, petId) {
    //   return $http.put('pet', data, config); 
    // }

    // function getUser (userId){
    //   return Restangular.one('user', userId).get();
    // }

    // function getUserPet (userId, petId){
    //   return Restangular.one('user', userId).one('pet', petId).get().then(function (pet){
    //     pet.edit = false;
    //     return pet;
    //   });
    // }

    // function getUserPets (userId, petIds){
    //   return _.map(petIds, function (petId) {
    //     return getUserPet(userId, petId);
    //   });
    // }

    


    //==========================================//
    //@NOTE dummy functions returning dummy data//
    //==========================================//
    // function getUser () {
    //   return {
    //     user: {
    //       id: '123',
    //       email: 'apple@hackreactor.com',
    //       firstName: 'Benjamin',
    //       lastName: 'Lee',
    //       streetAddress: 'Pineapple Street',
    //       city: 'SF',
    //       state: 'CA',
    //       zip: '41212',
    //       phone: '12313131'
    //     },
    //     pet: ['petId1', 'petId2'],
    //     request: ['requestId1', 'requestId1']
    //   };
    // }

    // function getUserPets () {
    //   return [
    //     {
    //       pet: {
    //         id: '123',
    //         name: 'Apple',
    //         birthdate: '2010-03-19',
    //         gender: 'F',
    //         breed: 'maltese-poodle',
    //         color: 'cream',
    //         weight: '5lb',
    //         neuter: true,
    //         microchip: '1CWR4465HS424342EQ',
    //         profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
    //       },
    //       vaccine: [
    //         {
    //           id: '456',
    //           name: 'bordetella',
    //           expiration: '3years',
    //           dateAdministered: '2013-10-09',
    //           dateExpired: '2014-10-09'
    //         }
    //       ],
    //       status: {
    //         vaccine: 'active',
    //         update: 'normal'
    //       },
    //       edit: false
    //     },
    //     {
    //        pet: {
    //         id: '456',
    //         name: 'Apple',
    //         birthdate: '2010-03-19',
    //         gender: 'F',
    //         breed: 'maltese-poodle',
    //         color: 'cream',
    //         weight: '5lb',
    //         neuter: true,
    //         microchip: '1CWR4465HS424342EQ',
    //         profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
    //       },
    //       vaccine: [
    //         {
    //           id: '456',
    //           name: 'bordetella',
    //           expiration: '3years',
    //           dateAdministered: '2013-10-09',
    //           dateExpired: '2014-10-09'
    //         }
    //       ],
    //       status: {
    //         vaccine: 'expiring',
    //         update: 'normal'
    //       },
    //       edit: false
    //     },
    //     {
    //        pet: {
    //         id: '789',
    //         name: 'Apple',
    //         birthdate: '2010-03-19',
    //         gender: 'F',
    //         breed: 'maltese-poodle',
    //         color: 'cream',
    //         weight: '5lb',
    //         neuter: true,
    //         microchip: '1CWR4465HS424342EQ',
    //         profileUrl: 'http://cl.jroo.me/z3/Q/8/F/e/a.baa-Puppy-or-teddy-bear.jpg'
    //       },
    //       vaccine: [
    //         {
    //           id: '456',
    //           name: 'bordetella',
    //           expiration: '3years',
    //           dateAdministered: '2013-10-09',
    //           dateExpired: '2014-10-09'
    //         },
    //         {
    //           id: '456',
    //           name: 'rabies',
    //           expiration: '3years',
    //           dateAdministered: '2013-10-09',
    //           dateExpired: '2014-10-09'
    //         }
    //       ],
    //       status: {
    //         vaccine: 'expired',
    //         update: 'pending'
    //       },
    //       edit: false
    //     }
    //   ];
    // }

    // function setUserEdit () {
    //   //send a request to update User info
    //   console.log('UserEdit sent');
    // }

    // function setUserPetEdit () {
    //   //send a request to update pet details
    //   console.log('UserPetEdit sent');
    // }

    // function setUserPetUpdate () {
    //   //send a request to update info from vet
    //   console.log('UserPetUpdate sent');
    // }

    // function cancelUserPetUpdate () {
    //   //ask to cancel latest update regardless
    //  console.log('UserPetUpdate cancelled'); 
    // }

    // return {
    //   setNewUser: setNewUser,
    //   setNewUserPet: setNewUserPet,
      
    //   getUser: getUser,
    //   getUserPet: getUserPet,
    //   getUserPets: getUserPets,

    //   setUserEdit: setUserEdit,
    //   setUserPetEdit: setUserPetEdit,
    //   setUserPetUpdate: setUserPetUpdate,

    //   cancelUserPetUpdate: cancelUserPetUpdate
    // };