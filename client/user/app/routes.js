angular.module('user')
  .config(function ($stateProvider) {

  // routing states, setting templates and controllers to use
  $stateProvider
    .state('public', {
      abstract: true,
      url: '/',
      template: '<div ui-view class="realm"></div>'
    })

    .state('public.landing', {
      url: '',
      templateUrl: 'app/landing/templates/landing.tpl.html',
      controller: 'LandingCtrl'
    })

    .state('public.login', {
      url: 'login',
      templateUrl: 'app/enter/templates/login.tpl.html',
      controller: 'EnterCtrl'
    })

    .state('public.signup', {
      url: 'signup',
      templateUrl: 'app/enter/templates/signup.tpl.html',
      controller: 'EnterCtrl'
    })

    .state('app', {
      abstract: true,
      url: '/app',
      template: '<div ui-view class="container"></div>',
      resolve: {
        auth: function ($q, $rootScope, AuthService) {
          var deferred = $q.defer();
          if (!AuthService.getCookie().loggedin) {
            $rootScope.scope.go('public.login');
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }
      }
    })

    .state('app.main', {
      url: '',
      templateUrl: 'app/main/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('app.profile', {
      url: '^/profile',
      templateUrl: 'app/profile/templates/profile.tpl.html',
      controller: 'ProfileCtrl'
    });

  });