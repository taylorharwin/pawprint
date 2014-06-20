'use strict';

describe('MainCtrl Test', function () {
  beforeEach(module('admin'));
  var sampleCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope;
    reqIDFactory = $injector.get('reqIDFactory');
    sampleCtrl = $controller('MainCtrl' {
        $scope: scope
        reqIDFactory: reqIDFactory
      });
  }));

  it('should have getter and setter functions for requestID', function () {
    expect(typeof scope.setReqAndTransition).toBe('function');
  });
  

});

