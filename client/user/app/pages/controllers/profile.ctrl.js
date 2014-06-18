angular.module('user.pages.controllers')
  .controller('ProfileCtrl', function ($scope, UserFactory, CurrentUserFactory) {
    console.log($scope);

    $scope.userId = CurrentUserFactory.getUserId();

    UserFactory.getUser($scope.userId).then(function (data) {
      $scope.user.user = data;
      // console.log($scope.user, 'beginning');
    });

    $scope.save = function() {
      // console.log($scope.user, 'prePUT');
      $scope.user.put().then(function (){
        console.log('successful put');
        $scope.update = true;
      }, function (response) {
        console.log('Error with response status code', response.status);
        $scope.update = false;
      });
    };
    
  });