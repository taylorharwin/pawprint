angular.module('user.pages.controllers')
  .controller('SignupCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    //not 100% sure about promises here
    // $scope.userSignup = function () {
    //   UserFactory.postUserSignup($scope.user).then(function (response) {
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

    $scope.userSignup = function () {
      UserFactory.postUserSignup($scope.user).then(function (response) {
        CurrentUserFactory.setUserId(res.body.id);
        $state.go('app.profile');
      }, function (response) {
        console.log('Error with status code', response.status);
        $scope.signupError = true;
      });
    };
    
  });