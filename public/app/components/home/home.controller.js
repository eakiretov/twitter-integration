'use strict';

(function () {
    angular.module('login').controller('homeController', function (tweetService, authService, Notification) {
        var vm = this;
        vm.tweet = {};
        vm.flowOptions = {
            target: '/media',
            uploadMethod: 'POST',
            testChunks: false,
            allowDuplicateUploads: true,
            simultaneousUploads: 1,
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            },
            chunkSize: 100 * 1024 * 1024,
            query: function (flowFile) {
                return {
                    fileName: flowFile.name
                }
            }
        };

        vm.fileSuccess = function ($file, $message, $flow) {
            $flow.removeFile($file);
            var response = JSON.parse($message);
            vm.tweet.media = {
                id: response.data._id,
                url: '/media/' + response.data._id
            };
        };

        vm.filesSubmitted = function ($flow, $file) {
            $flow.upload();
        };

        vm.fileUploadingError = function ($file, $message, $flow) {
            Notification.error('Error occurred during uploading file');
        };

        vm.removeImage = function () {
            vm.tweet.media = null;
        };

        vm.post = function () {
            tweetService.post(vm.tweet)
                .success(function (response) {
                    Notification.success('Tweet was posted');
                    vm.tweet = {};
                    vm.tweets.splice(0, 0, response.data);
                })
                .error(function (err) {
                    Notification.error('Error occurred during posting the tweet: ' + err.statusText);
                });
        };

        vm.refresh = function () {
            tweetService.getList()
                .success(function (response) {
                    vm.tweets = response.data;
                })
                .error(function () {
                    Notification.error('Error occurred during getting tweets');
                });
        };

        if (authService.isAuthenticated()) {
            vm.refresh();
        }
    });
})();