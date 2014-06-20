angular.module('user.pages.controllers')
  .controller('ProfileCtrl', function ($scope, $state, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.userId = CurrentUserFactory.getUserId();

    UserFactory.getUser($scope.userId).then(function (response) {
      if (response.status === 200) {
        $scope.user = data;
        // console.log($scope.user, 'beginning');
      } else {
        console.log('Error with request', response.status);
      }
    }, function (error) {
      console.log(error);
    });

    $scope.updateUser = function() {
      // console.log($scope.user, '=========');
      $scope.user.put().then(function (response){
        if (response.status === 200) {
          console.log('successful put');
          // console.log(response);
          //update the scope user to reflect db
          $scope.user = response.body;
          $scope.updateSuccess = true;
          $scope.updateError = false;
        } else {
          console.log('Error with request', response.status);
        }
      }, function (error) {
        console.log(error);
        $scope.updateSuccess = false;
        $scope.updateError = true;
      });
    };
    
    $scope.deleteUser = function() {
      UserFactory.deleteUser($scope.userId).then(function (response) {
        if (response.status === 200) {
          console.log('deleted user');
          // @NOTE delete the local auth settings
          CurrentUserFactory.setUserId('');
          $state.go('public.home'); 
        } else {
          console.log('Error with request', response.status);
        }
      }, function (error) {
        console.log(error);
      });
    };

  });