'use strict';

angular.module('admin.common.services')
  .factory('reqIDFactory', function () {

    var data = { requestID: '' };

    return {
      getRequestID: function () {
        return data.requestID;
      },
      setRequestID: function (requestID) {
        data.requestID = requestID;
      }
    };
  });
