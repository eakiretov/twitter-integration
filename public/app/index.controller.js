'use strict';

(function () {

    angular.module('app').controller('indexController', indexController);

    function indexController(authService) {
        var vm = this;

        vm.isAuthenticated = function () {
            return authService.isAuthenticated();
        };
    }

})();