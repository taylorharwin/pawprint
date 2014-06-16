angular.module('user.pages.services')

  .factory('VaccineFactory', function () {

    function checkExpiry (vaccine) {
      var now = Date.now();
      var onemonth = now + 2592000000;
      // @TODO parse date from received from db to milliseconds
      // var expiryDate = vaccine.dateExpired;
      //==========================================//
      //@NOTE dummy variables returning dummy data//
      //==========================================// 
      var expiryDate = now - 2692000000;

      if (expiryDate > now) {
        return 'active';
      } else if (expiryDate < onemonth) {
        return 'expiring';
      } else {
        return 'expired';
      }
    }

    return {
      checkExpiry: checkExpiry
    };

  });
