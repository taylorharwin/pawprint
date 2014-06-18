angular.module('admin.pages', [
  'ui.router',
  'admin.pages.controllers',
  'admin.pages.directives',
  'admin.pages.services',
  'ui.bootstrap'
]);

angular.module('admin.pages')
  .config(function ($stateProvider) {

  $stateProvider
    .state('public', {
      abstract: true,
      url: '/',
      template: '<div ui-view class="realm"></div>'
    })
     .state('public.login', {
      url: '',
      templateUrl: 'app/pages/templates/login.tpl.html',
      controller: 'LoginCtrl'
    })

    .state('app', {
      abstract: true,
      url: '/admin/app',
      template: '<div ui-view class="realm"></div>'
    })

    .state('app.main', {
      url: '',
      templateUrl: 'app/pages/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('app.request', {
      url: '^/request',
      templateUrl: 'app/pages/templates/request.tpl.html',
      controller: 'RequestCtrl'
    });

  });

angular.module('admin.pages.controllers', []);
angular.module('admin.pages.directives', []);
angular.module('admin.pages.services', []);