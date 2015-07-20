(function() {

  'use strict';

  app
    .factory('Test', Test);

  Test.$inject = ['GenericCRUDService', '$http'];

  function Test(GenericCRUDService, $http) {

    var test = GenericCRUDService('test');
    return test;
  }

})();
