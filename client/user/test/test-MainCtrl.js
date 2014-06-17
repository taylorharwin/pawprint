describe('MainCtrl variable types test', function () {
  beforeEach(module('user'));

  var sampleCtrl, scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    sampleCtrl = $controller('MainCtrl', {
        $scope: scope
      });
  }));

  it('checkExpiry, function', function(){
    expect(typeof scope.checkExpiry).toBe('function');
  });

  it('setUserPetUpdate, function', function(){
    expect(typeof scope.setUserPetUpdate).toBe('function');
  });

  it('cancelUserPetUpdate, function', function(){
    expect(typeof scope.cancelUserPetUpdate).toBe('function');
  });

  it('setUserPetEdit, function', function(){
    expect(typeof scope.setUserPetEdit).toBe('function');
  });

  it('startUserPetEdit, function', function(){
    expect(typeof scope.startUserPetEdit).toBe('function');
  });

  it('addPetEntry, function', function(){
    expect(typeof scope.addPetEntry).toBe('function');
  });

  it('user, object', function(){
    expect(typeof scope.user).toBe('object');
  });

  it('pets, array', function(){
    expect(Array.isArray(scope.pets)).toBe(true);
  });

});