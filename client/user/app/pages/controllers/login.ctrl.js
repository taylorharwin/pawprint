angular.module('user.pages.controllers')
  .controller('LoginCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    //not 100% sure about promises here
    // $scope.userSignup = function () {
    //   UserFactory.postUserLogin($scope.user).then(function (response) {
    //     CurrentUserFactory.setUserId(res.body.id);
    //     return $q.defer().promise;
    //   }, function (response) {
    //     console.log('Error with status code', response.status);
    //     $scope.signupError = true;
    //     return;
    //   }).then(function (){
    //     $state.go('app.main');
    //   });
    // };

    $scope.userLogin = function () {
      console.log('function userLogin running...');
      UserFactory.postUserLogin($scope.user).then(function (response) {
        console.log('successful post to server');
        CurrentUserFactory.setUserId(response.body.id);
        $state.go('app.main');
      }, function (response) {
        console.log('Error with status code', response.status);
        $scope.signupError = true;
      });
    };
    
  });