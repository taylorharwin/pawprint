angular.module('user.pages.services')

  .factory('VetFactory', function ($http) {

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
  