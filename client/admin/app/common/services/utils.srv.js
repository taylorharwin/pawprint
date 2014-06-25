'use strict';

angular.module('admin.common.services')
  .factory('reqIDFactory', function (Restangular) {

    var data = {requestID: '', requestStatus: '', userID: '', petID: '', vetID: ''};

    return {

      getAllRequests: function(adminID){
        return Restangular.one('admin', adminID).all('requests').getList();
      },

      getRequestID: function () {
        return data.requestID;
      },
      setRequestID: function (requestID) {
        data.requestID = requestID;
      },
      getRequestStatus: function () {
        return data.requestStatus;
      },
      setRequestStatus: function (requestStatus) {
        data.requestStatus = requestStatus;
      },
      getPetID: function () {
        return data.petID;
      },
      setPetID: function (petID) {
        data.petID = petID;
      },
      getUserID: function () {
        return data.userID;
      },
      setUserID: function (userID) {
        data.userID = userID;
      },
      getVetID: function () {
        return data.vetID;
      },
      setVetID: function (vetID) {
        data.vetID = vetID;
      },

      setClassforStatus: function (requestStatus) {
        if (requestStatus === 'new') {
          return 'label label-primary';
        }
        if (requestStatus === 'pending') {
          return 'label label-info';
        }
        if (requestStatus === 'complete') {
          return 'label label-default';
        }
        if (requestStatus === 'cancelled') {
          return 'label label-warning';
        }
      }
    };
  })

.constant('statusCodeConst', [{name: 'new'}, {name: 'pending'}, {name: 'complete'}, {name: 'cancelled'}])

  
.service('formattingService', function () {

  //A function to turn date objects into formatted date strings
  this.cleanDates = function () {
    return angular.forEach(this, function (item) {
      if (item.created_at) {
        item.created_at = (new Date(item.created_at)).toLocaleDateString();
      }
      if (item.updated_at) {
        item.updated_at = (new Date(item.updated_at)).toLocaleDateString();
      }
      if (item.dateAdministered) {
        item.dateAdministered = (new Date(item.dateAdministered)).toLocaleDateString();
      }
      if (item.dateExpired) {
        item.dateExpired = (new Date(item.dateExpired)).toLocaleDateString();
      }
    });
  };

  //Uses client-side record of all vaccines to match a vaccination name to each record for a given request. 
  this.addVaccineNames = function (allVaccines) {
    return angular.forEach(this, function (vaccinationRecord) {
      var ID = vaccinationRecord.vaccine_id;
      angular.forEach(allVaccines, function (vaccine) {
        if (vaccine.id === ID) {
          vaccinationRecord.name = vaccine.name;
        }
      });
    });

  };

});



