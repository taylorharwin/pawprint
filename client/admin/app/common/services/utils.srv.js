'use strict';

angular.module('admin.common.services')
  .factory('ReqID', function () {

    var data = { RequestID: '' };

    return {
      getRequestID: function () {
        return data.RequestID;
      },
      setRequestID: function (requestID) {
        data.RequestID = requestID;
        console.log(data.RequestID);
      }
    };
  });

