'use strict';

angular.module('admin.pages.directives')

  .directive('vetInfo', function () {
    return {restrict: 'AE',
     scope: false,
     replace: 'true',
     templateUrl: 'app/pages/templates/vet-info.tpl.html'
   };
  })

  .directive('userInfo', function () {
    return {restrict: 'AE',
      scope: false,
      replace: 'true',
      templateUrl: 'app/pages/templates/user-info.tpl.html'
    };
  })

  .directive('vaccRecord', function () {
    return {restrict: 'AE',
      scope: false,
      replace: 'true',
      templateUrl: 'app/pages/templates/vacc-record.tpl.html'};
  })

  .directive('contactHist', function () {
    return {restrict: 'AE',
    scope: false,
    replace: 'true',
    templateUrl: 'app/pages/templates/contact-hist.tpl.html'};
  });
