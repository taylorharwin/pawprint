'use strict';

 describe('HomeCtrl Test', function () {
  beforeEach(module('user'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('HomeCtrl', {
        $scope: scope
      });
  }));

  it('should know that dogs say woof', function(){
    expect(scope.dogSpeak).toBe('woof');
  });

  //add more tests here. <3 Taylor

});
