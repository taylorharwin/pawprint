angular.module('user.profile.controllers')
  .controller('ProfileCtrl', function ($scope, CurrentUserService) {
    console.log($scope);

    $scope.CurrentUserService = CurrentUserService;

    $scope.update = {
      success: false,
      error: false
    };
    $scope.user = CurrentUserService.getUser();

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