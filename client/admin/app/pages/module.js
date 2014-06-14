angular.module('admin.pages', [
  'ui.router',
  'admin.pages.controllers',
  'admin.pages.directives',
  'admin.pages.services'
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
      url: '/app',
      template: '<div ui-view class="realm"></div>'
    })

    .state('app.main', {
      url: '',
      templateUrl: 'app/pages/templates/main.tpl.html',
      controller: 'MainCtrl'
    })

    .state('app.record', {
      url: '^/record',
      templateUrl: 'app/pages/templates/record.tpl.html',
      controller: 'RecordCtrl'
    });

  });

angular.module('admin.pages.controllers', []);
angular.module('admin.pages.directives', []);
angular.module('admin.pages.services', []);