"use strict";
exports.common = function (module) {
    module.factory('sgCommon', commonFactory);
    function commonFactory($q, apiConfig, BARCODE_VRES) {
        'ngInject';
        return {
            thenDefer: function (cb) {
                return function () {
                    var deferred = $q.defer();
                    if (typeof cb === 'function')
                        cb.apply(deferred, arguments);
                    else
                        deferred.resolve();
                    return deferred.promise;
                };
            },
            // 获取api路径
            dealPath: function (api, type) {
                if (type === void 0) { type = 'post'; }
                if (api === undefined)
                    return '';
                var _api = api, _u = '';
                if (apiConfig[type] === undefined)
                    return '';
                if (apiConfig[type][api] !== undefined) {
                    _api = apiConfig[type][api];
                }
                if (_api.indexOf(':') !== -1) {
                    var _s = _api.split(':');
                    if (apiConfig.basePath[_s[0]] !== undefined) {
                        _u += apiConfig.basePath[_s[0]];
                        _u += _s[1] || '';
                    }
                    else {
                        _u = _api;
                    }
                }
                else {
                    _u = _api;
                }
                return _u;
            },
            isWeixin: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) != null && ua.match(/MicroMessenger/i).toString() == "micromessenger") {
                    return true;
                }
                else {
                    return false;
                }
            },
            isIos: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) != null && ua.match(/MicroMessenger/i).toString() != "micromessenger"
                    && ua.match(/iPhone/i) != null && ua.match(/iPhone/i).toString() == "iphone") {
                    return true;
                }
                else {
                    return false;
                }
            },
            isIosWx: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) != null && ua.match(/MicroMessenger/i).toString() == "micromessenger"
                    && ua.match(/iPhone/i) != null && ua.match(/iPhone/i).toString() == "iphone") {
                    return true;
                }
                else {
                    return false;
                }
            },
            isIPhoneV: function (v) {
                var ua = navigator.userAgent;
                var pattern = new RegExp("iPhone OS " + v);
                return pattern.test(ua);
            },
            isAndroidV: function (v) {
                var ua = navigator.userAgent;
                var pattern = new RegExp("Android " + v + '.');
                return pattern.test(ua);
            },
            q: function (url) {
                var _search = "", q = {}, _q;
                if (url === undefined) {
                    _search = window.location.search;
                }
                else {
                    _search = url;
                }
                if (_search.split('?')[1]) {
                    _q = _search.split('?')[1].split('&');
                    for (var i = 0, l = _q.length; i < l; i++) {
                        var _t = _q[i].split('=');
                        q[_t[0]] = _t[1];
                    }
                }
                return q;
            },
            localStorage: {
                set: function (key, value, time) {
                    // var o={};
                    // if (time) {
                    // o = { addTime: new Date().getTime(), endTime: time };
                    // }
                    // o.data = value;
                    // var str= JSON.stringify(o);
                    window.localStorage.setItem(key, value);
                },
                get: function (key) {
                    var str = window.localStorage.getItem(key);
                    // var o = cacheMap.get(key);
                    // if (o === undefined) {
                    //     return;
                    // }
                    // if (o !== undefined && o.endTime === undefined) {
                    //     return o.data;
                    // } else if (o !== null && !!o.endTime && o.endTime >= new Date().getTime()) {
                    //     return o.data;
                    // }
                    return str === null ? undefined : str;
                },
                remove: function (key) {
                    window.localStorage.removeItem(key);
                    // cacheMap.delete(key);
                },
                clear: function () {
                    window.localStorage.clear();
                }
            },
            // 条形码校验
            validateBarcode: function (code) {
                if (isNaN(code) || code.length !== 13) {
                    return BARCODE_VRES.NOIS;
                }
                var region = parseInt(code.slice(0, 3));
                if ((region >= 690 && region <= 699) || (region >= 977 && region <= 979)) {
                    var c1 = +code.charAt(0) + +code.charAt(2) + +code.charAt(4) + +code.charAt(6) + +code.charAt(8) + +code.charAt(10);
                    var c2 = +code.charAt(1) + +code.charAt(3) + +code.charAt(5) + +code.charAt(7) + +code.charAt(9) + +code.charAt(11);
                    var cc = c1 + c2 * 3;
                    var n = (10 - cc % 10) % 10;
                    if (code.charAt(12) == n) {
                        return BARCODE_VRES.SUCCESS;
                    }
                    else {
                        return BARCODE_VRES.VALIERR;
                    }
                }
                else {
                    return BARCODE_VRES.ABROAD;
                }
            }
        };
    }
    return module;
};
//# sourceMappingURL=commonImpl.js.map