'use strict';

describe('RequestCtrl Test', function () {
  beforeEach(module('admin'));
  var sampleCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope;
    sampleCtrl = $controller('RequestCtrl', {
        $scope: scope
      });
  }));

  it('should be able to set requestID to shared scope variable', function () {
    expect(scope.reqID).toBe('');

  });

});
