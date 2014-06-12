angular.module('admin', [
  'ui.router',

  'admin.common',
  'admin.pages'
]);

angular.module('admin')
  .config(function ($locationProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });