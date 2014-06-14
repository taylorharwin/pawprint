angular.module('user.pages.services')

  .factory('UserFactory', function (Restangular, $scope, $http){

    var baseUrl = 'http://127.0.0.1:8000/';
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    //@TODO test all the functions in this factory
    function newUser (data) {
      var url = baseUrl + 'user';
      return $http.post(url, data, config);
    }

    function getUserPet (userId, petId){
      return Restangular.one('user', userId).one('pet', petId).get().then(function (pet){
        return pet;
      });
    }

    function getUserPets (userId, petIds){
      return _.map(petIds, function (petId) {
        return getUserPet(userId, petId);
      });
    }

    function getUser (userId){
      return Restangular.one('user', userId).get().then(function (user){
        $scope.user = user;
        var pets = getUserPets(userId, user.pets);
        $scope.pets = pets;
        return user;
      });
    }

    return {
      newUser: newUser,
      getUserPet: getUserPet,
      getuserPets: getUserPets,
      getuser: getUser
    };

  });