'use strict';

(function () {

    angular.module('app')
        .config(function ($urlRouterProvider, $httpProvider, $authProvider, NotificationProvider) {
            $urlRouterProvider.otherwise(function ($injector, $location) {
                var path = $location.path();
                //Stops the loop-de loop
                if (path === '/' || path === '') {
                    $injector.get('$state').transitionTo('home');
                }
            });

            $httpProvider.interceptors.push('httpInterceptor');

            $authProvider.twitter({
                url: '/auth/twitter',
                authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                redirectUri: 'http://localhost:3000',
                oauthType: '1.0',
                popupOptions: {width: 495, height: 645}
            });
            $authProvider.tokenName = 'token';
            $authProvider.tokenPrefix = null;

            NotificationProvider.setOptions({
                delay: 10000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'left',
                positionY: 'bottom'
            });
        })
        .run(function ($rootScope, $window, $log, $state, authService) {

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !authService.isAuthenticated()) {
                    // User isn’t authenticated
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            });

            $rootScope.$on('$stateChangeError', function () {
                $log.log(arguments);
            });

            $rootScope.$on('auth:error', function () {
                authService.logout();
                $state.go('login');
            });
        });

})();