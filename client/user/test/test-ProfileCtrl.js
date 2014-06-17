describe('ProfileCtrl variable types test', function () {
  beforeEach(module('user'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('ProfileCtrl', {
        $scope: scope
      });
  }));

  it('user, object', function(){
    expect(typeof scope.user).toBe('object');
  });

  it('setUserEdit, function', function(){
    expect(typeof scope.setUserEdit).toBe('function');
  });

});