import * as angular from "angular";
import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
import {ICommon} from "../common";
import IHttpPromise = angular.IHttpPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import {ISgResult} from "../proxyHttp";

export const proxyHttp: IAddMemberFn = function (module: IModule) {
    module.factory('proxyHttp', proxyHttpFactory);
    function proxyHttpFactory($q: ng.IQService, $http: ng.IHttpService, sgCommon: ICommon) {
        'ngInject';
        return {
            get: function <T>(api: string, params: any): IHttpPromise<T> {
                const _path = sgCommon.dealPath(api, 'get');

                return $http.get<ISgResult<T>>(_path, {
                    params,
                    cache: false
                }).then(function (res: IHttpPromiseCallbackArg<ISgResult<T>>) {
                    var deferred = $q.defer();
                    if (res.data.code === 0) {
                        deferred.resolve(res.data.data);
                    } else {
                        deferred.reject(res.data);
                    }
                    return deferred.promise;
                });
            },
            post: function <T>(api: string, params: any): IHttpPromise<T> {
                const _path = sgCommon.dealPath(api, 'get');
                return $http.post<ISgResult<T>>(_path, params, {
                    cache: false
                }).then(function (res: IHttpPromiseCallbackArg<ISgResult<T>>) {
                    var deferred = $q.defer();
                    if (res.data.code === 0) {
                        deferred.resolve(res.data.data);
                    } else {
                        deferred.reject(res.data);
                    }
                    return deferred.promise;
                });
            }
        }
    }

    return module;
};
