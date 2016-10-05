'use strict';

(function () {
    angular.module('navbar').controller('navbarController', function ($state, authService, $timeout) {
        var vm = this;

        var userInfo = authService.getUserInfo();
        vm.userName = userInfo.userName;

        vm.logout = function () {
            authService.logout();
            $timeout(function () {
                $state.go('login');
            });
        };

    })
})();