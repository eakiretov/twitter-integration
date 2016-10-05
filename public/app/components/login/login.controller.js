'use strict';

(function () {

    angular.module('login').controller('loginController', function (authService, $state, Notification) {
        var vm = this;

        vm.auth = function () {
            authService.authenticate('twitter').then(function () {
                $state.go('home');
            }, function () {
                Notification.error('Error is occurred during Twitter authentication');
            });
        }
    });

})();