'use strict';

angular.module('admin.common.services')
  .factory('reqIDFactory', function () {

    var data = { requestID: '', requestStatus: ''};

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
      }

    };
  })

.constant('statusCodeConst', [
  'New',
  'Pending',
  'Closed',
  'Cancelled'
]);


