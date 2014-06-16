angular.module('user.pages.services')

  .factory('VetFactory', function ($http) {

    //@TODO test all the functions in this factory
    function getVets (){
      return Restangular.all('vets').getList().then(function (vets){
        $scope.vets = vets;
        return vets;
      });
    }

    return {
      getVets: getVets
    };

  });
