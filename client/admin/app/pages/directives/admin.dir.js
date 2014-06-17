'use strict';

angular.module('admin.pages.directives')

  .directive('vetInfo', function () {
    return {restrict: 'AE',
     replace: 'true',
     template: '<h3>Vet Info Directive!!</h3>'};
  })

  .directive('userInfo', function () {
    return {restrict: 'AE',
      replace: 'true',
      template: '<h3>Customer Info Directive!!</h3>'};
  })

  .directive('vaccRecord', function () {
    return {restrict: 'AE',
      replace: 'true',
      template: '<h3>Vaccine Records Directive!!</h3>'};
  })

  .directive('contactHist', function () {
    return {restrict: 'AE',
    replace: 'true',
    template: '<h3>Contact History Directive!!</h3>'};
  });
