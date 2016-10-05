'use strict';

(function () {

    angular.module('shared').factory('httpInterceptor', httpInterceptor);

    function httpInterceptor($q, $rootScope) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $rootScope.$broadcast('auth:error');
                }

                return $q.reject(rejection);
            }
        };
    }

})();
