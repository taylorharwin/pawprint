angular.module('user.pages.services')

  .factory('VetFactory', function ($http) {

    //@TODO test all the functions in this factory
    //@TODO use these functions to request API:
    function getVets () {
      return Restangular.all('vets').getList().then(function (vets){
        return vets;
      });
    }

    //==========================================//
    //@NOTE dummy functions returning dummy data//
    //==========================================//

    function getVets () {
      return [
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        },
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        },
        {
          practiceName: 'abc',
          website: 'abc',
          streetAddress: 'abc',
          city: 'abc',
          zip: '123',
          phone: '123'
        }
      ];
    }

    return {
      getVets: getVets
    };

  });
