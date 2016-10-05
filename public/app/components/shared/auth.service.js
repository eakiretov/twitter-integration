'use strict';

(function () {

    angular.module('shared').service('authService', function ($auth) {

        function authenticate() {
            return $auth.authenticate('twitter');
        }

        function getToken() {
            return $auth.getToken();
        }

        function getUserInfo() {
            return $auth.getPayload();
        }

        function setToken(token) {
            $auth.setToken(token);
        }

        function logout() {
            $auth.logout();
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        return {
            authenticate: authenticate,
            getToken: getToken,
            setToken: setToken,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getUserInfo: getUserInfo
        }
    });

})();