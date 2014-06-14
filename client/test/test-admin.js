'use strict';

describe('MainCtrl Test', function () {
  beforeEach(module('admin'));

  var sampleCtrl, scope, state;

  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope;
    state = $state;
    sampleCtrl = $controller('MainCtrl', {
        $scope: scope
      });
  }));

  it('should set request IDs and transition to request view', function () {
    scope.setReqAndTransition(123);
    expect(state).toBe('woof');
  });

  //add more tests here. <3 Taylor

});
