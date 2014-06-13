'use strict';

 
 describe('HomeCtrl Test', function () {
  beforeEach(module('admin'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('SampleCtrl', {
        $scope: scope
      });
  }));

  it('should know that dogs say woof', function(){
    expect(scope.dogSpeak).toBe('woof');
  });

});