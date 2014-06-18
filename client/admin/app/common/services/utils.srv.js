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

.constant('statusCodeConst', ['new', 'pending', 'complete', 'cancelled']);

    



