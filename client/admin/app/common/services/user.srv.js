'use strict';

angular.module('admin.common.services')
  .service('userService', function (Restangular, reqIDFactory) {

  function getPetInfo(adminID, petID) {
    return Restangular.one('admin', adminID).one('pets', petID).get();
  }

  function editPetInfo(adminID, petID, data) {
    return Restangular.one('admin', adminID).one('pets', petID).put(data);
  }

   function getUserInfo(adminID, userID) {
    return Restangular.one('admin', adminID).one('users', userID).get();
  }

  function editUserInfo(adminID, userID, data) {
    return Restangular.one('admin', adminID).one('users', userID).put(data);
  }

  function getContactLogs(adminID, reqID) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('logs').getList();
  }

  function addContactLog(adminID, reqID, data) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('logs').post(data);
  }

  this.getPetInfo = getPetInfo;
  this.editPetInfo = editPetInfo;
  this.getContactLogs = getContactLogs;
  this.addContactLog = addContactLog;
     
});