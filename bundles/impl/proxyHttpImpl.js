"use strict";
exports.proxyHttp = function (module) {
    module.factory('proxyHttp', proxyHttpFactory);
    function proxyHttpFactory($q, $http, sgCommon) {
        'ngInject';
        return {
            get: function (api, params) {
                var _path = sgCommon.dealPath(api, 'get');
                return $http.get(_path, {
                    params: params,
                    cache: false
                }).then(function (res) {
                    var deferred = $q.defer();
                    if (res.data.code === 0) {
                        deferred.resolve(res.data.data);
                    }
                    else {
                        deferred.reject(res.data);
                    }
                    return deferred.promise;
                });
            },
            post: function (api, params) {
                var _path = sgCommon.dealPath(api, 'get');
                return $http.post(_path, params, {
                    cache: false
                }).then(function (res) {
                    var deferred = $q.defer();
                    if (res.data.code === 0) {
                        deferred.resolve(res.data.data);
                    }
                    else {
                        deferred.reject(res.data);
                    }
                    return deferred.promise;
                });
            }
        };
    }
    return module;
};
//# sourceMappingURL=proxyHttpImpl.js.map