'use strict';

var services = {};

module.exports.resolve = function (name) {
    return services[name];
};

module.exports.inject = function (name, service) {
    services[name] = service;
};