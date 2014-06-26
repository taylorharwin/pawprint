angular.module('user.profile.controllers')
  .controller('ProfileCtrl', function ($scope, AuthService, CurrentUserService) {
    console.log($scope);

    $scope.CurrentUserService = CurrentUserService;
    CurrentUserService.retrieveUser(AuthService.getCookie().userId)
      .then(function (user){
        $scope.user = user;
      });

    $scope.updateUser = function() {
      CurrentUserService.updateUser()
      .then(function (response) {
        console.log('successful put request');
        $scope.update = {
          success: true,
          error: false
        };
      }, function (error) {
        console.log(error);
        $scope.update = {
          success: false,
          error: true
        };
      });
    };

  });