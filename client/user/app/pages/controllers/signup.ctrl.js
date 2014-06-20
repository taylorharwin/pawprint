angular.module('user.pages.controllers')
  
  .controller('SignupCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.userSignup = function () {
      UserFactory.postUserSignup($scope.user).then(function (response) {
        console.log(response);
        CurrentUserFactory.setUser(response);
        console.log(CurrentUserFactory.getUser());
        $state.go('app.profile');
        // if (response.status === 201) {
        //   CurrentUserFactory.setUserId(response.id);
        //   $state.go('app.profile');
        // } else {
        //   console.log('Error with request', response.status);
        //   $scope.signupError = true;
        // }
      }, function (error) {
        console.log(error);
        $scope.signupError = true;
      });
    };
    
  });