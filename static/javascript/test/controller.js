(function() {

    'use strict';
    app.controller('GoodController', GoodController);

    function GoodController($scope) {
        console.log("lala");
        $scope.name = "World";
    }
    GoodController.$inject = ['$scope'];

})();