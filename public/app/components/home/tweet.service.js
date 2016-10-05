'use strict';

(function () {
    angular.module('home').service('tweetService', function ($http) {

        function getList() {
            return $http.get('/tweet');
        }

        function post(tweet) {
            return $http.post('/tweet', tweet);
        }

        return {
            getList: getList,
            post: post
        }
    });
})();