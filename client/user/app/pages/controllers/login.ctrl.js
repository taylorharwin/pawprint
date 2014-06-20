angular.module('user.pages.controllers')

  .controller('LoginCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function () {
      // console.log('function userLogin running...');
      UserFactory.postUserLogin($scope.user).then(function (response) {
        // console.log('successful post to server');
        if (response.status === 200) {
          CurrentUserFactory.setUserId(response.id);
          $state.go('app.main');
        } else {
          console.log('Error with request', response.status);
          $scope.loginError = true;
        }
      }, function (response) {
        console.log('Error with login request');
        $scope.loginError = true;
      });
    };
    
  });