angular.module('user.pages.controllers')
  .controller('ProfileCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.userId = CurrentUserFactory.getUserId();

    UserFactory.getUser($scope.userId).then(function (data) {
      $scope.user = data;
      // console.log($scope.user, 'beginning');
    });

    $scope.updateUser = function() {
      // console.log($scope.user, '=========');
      $scope.user.put().then(function (response){
        console.log('successful put');
        // console.log(response);
        //update the scope user to reflect db
        $scope.user = response;
        $scope.updateSuccess = true;
        $scope.updateError = false;
      }, function (response) {
        console.log('Error with request');
        $scope.updateSuccess = false;
        $scope.updateError = true;
      });
    };
    
    $scope.deleteUser = function() {
      UserFactory.deleteUser($scope.userId).then(function (response) {
        console.log('deleted user');
        // @NOTE delete the local auth settings
        CurrentUserFactory.setUserId('');
        $state.go('public.home');
      }, function (response) {
        console.log('Error with request');
      });
    };

  });