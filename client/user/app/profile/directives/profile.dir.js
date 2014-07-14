'use strict';

angular.module('user.profile.directives')

  .directive('profile', function (AuthService, CurrentUserService) {
    return {
      restrict: 'AE',
      scope: {

      },
      templateUrl: 'app/profile/templates/profile.tpl.html',
      replace: true,
      link: function (scope) {
        CurrentUserService.retrieveUser(AuthService.getCookie().get('userId'))
        .then(function (user){
          scope.user = user;
        });

        scope.stopPropogation = function() {
          event.stopPropogation;
        };

        scope.editingUser = false;
        scope.editUser = function (tempUser) {
          scope.stopPropogation();
          scope.tempUser = angular.copy(tempUser);
          scope.editingUser = !scope.editingUser;
        };

        scope.updateUser = function (index) {
          scope.stopPropogation();
          scope.editingUser = !scope.editingUser;
          CurrentUserService.updateUser()
          .then(function (response) {
            console.log('successful put request');
            scope.update = {
              success: true,
              error: false
            };
          }, function (error) {
            console.log(error);
            scope.update = {
              success: false,
              error: true
            };
          });
        };

        scope.cancelEdit = function () {
          scope.stopPropogation;
          scope.editingUser = !scope.editingUser;
          scope.user = scope.tempUser;
        };
      }
    };
  });

