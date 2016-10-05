'use strict';

(function () {

    angular.module('login')
        .config(function ($stateProvider) {
            var generateRoute = function (url) {
                return {
                    url: url,
                    templateUrl: 'app/components/login/login.template.html',
                    controller: 'loginController',
                    controllerAs: 'vm'
                };
            };

            $stateProvider
                .state('login', generateRoute('/login'));
        });
})();