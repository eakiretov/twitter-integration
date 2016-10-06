'use strict';

(function () {

    angular.module('home')
        .config(function ($stateProvider) {

            var generateRoute = function (url) {
                return {
                    url: url,
                    templateUrl: 'app/components/home/home.template.html',
                    controller: 'homeController',
                    controllerAs: 'vm',
                    authenticate: true
                };
            };

            $stateProvider
                .state('home', generateRoute('/home'));
        });
})();