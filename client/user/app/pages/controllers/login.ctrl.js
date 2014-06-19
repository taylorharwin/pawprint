angular.module('user.pages.controllers')
  .controller('LoginCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userLogin = function () {
      console.log('function userLogin running...');
      UserFactory.postUserLogin($scope.user).then(function (response) {
        CurrentUserFactory.setUserId(response.id);
        $state.go('app.main');
      }, function (error){
        console.log('Error in request', error);
      });
    };
    
  });