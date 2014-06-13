'use strict';

angular.module('user.pages.controllers')
  .controller('HomeCtrl', function ($scope) {
    console.log($scope);

    //Function added to prove that tests work. Can remove
    $scope.dogSpeak = 'woof';
  });