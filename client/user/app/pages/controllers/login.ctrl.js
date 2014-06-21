angular.module('user.pages.controllers')

  .controller('LoginCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function () {
      UserFactory.postUserLogin($scope.user)
        .then(function (response) {
          CurrentUserFactory.setUserId(response.id);
          $state.go('app.main');
        }, function (error) {
          $scope.loginError = true;
        });
    };
    
  });