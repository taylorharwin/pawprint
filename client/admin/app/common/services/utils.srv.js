'use strict';

angular.module('admin.common.services')
  .factory('reqIDFactory', function () {

    var data = { requestID: '', requestStatus: '', userID: '', petID: '', vetID: ''};

    return {
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
        console.log(data);
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

.constant('statusCodeConst', [{name: 'new'}, {name: 'pending'}, {name: 'complete'}, {name: 'cancelled'}]);

    



