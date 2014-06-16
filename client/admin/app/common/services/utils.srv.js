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
        if (requestStatus === 'New') {
          return 'label label-primary';
        }
        if (requestStatus === 'Pending') {
          return 'label label-info';
        }
        if (requestStatus === 'Closed') {
          return 'label label-default';
        }
        if (requestStatus === 'Cancelled') {
          return 'label label-warning';
        }
      }
    };
  })

.constant('statusCodeConst', ['New', 'Pending', 'Closed', 'Cancelled']);

    



