"use strict";
exports.provider = function (module) {
    var apiConfigProvider = function () {
        var _this = {
            basePath: {},
            post: {},
            get: {},
            $get: function () {
                return _this;
            }
        };
        return _this;
    };
    var serverConfigProvider = function () {
        var _this = {
            DEV: [],
            TEST: [],
            PRO: [],
            $get: function () {
                return _this;
            }
        };
        return _this;
    };
    module.provider('apiConfig', apiConfigProvider)
        .provider('serverConfig', serverConfigProvider);
    return module;
};
