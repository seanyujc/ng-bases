import * as angular from "angular";
import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
import {ICommon} from "../common";
import IHttpPromise = angular.IHttpPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import {ISgResult, IProxyHttp} from "../proxyHttp";

class ProxyHttpImpl implements IProxyHttp {

    static $inject = ["$http", "sgCommon"];

    constructor(private $q: ng.IQService,private $http: ng.IHttpService, private sgCommon: ICommon){
    }

    get<T>(api: string, params: any): IHttpPromise<T> {
        const _path = this.sgCommon.dealPath(api, 'get');
        return this.$http.get<ISgResult<T>>(_path, {
            params,
            cache: false
        }).then(function (res: IHttpPromiseCallbackArg<ISgResult<T>>) {
            var deferred = this.$q.defer();
            if (res.data.code === 0) {
                deferred.resolve(res.data.data);
            } else {
                deferred.reject(res.data);
            }
            return deferred.promise;
        });
    }

    post<T>(api: string, params: any): IHttpPromise<T> {
        const _path = this.sgCommon.dealPath(api, 'get');
        return this.$http.post<ISgResult<T>>(_path, params, {
            cache: false
        }).then(function (res: IHttpPromiseCallbackArg<ISgResult<T>>) {
            var deferred = this.$q.defer();
            if (res.data.code === 0) {
                deferred.resolve(res.data.data);
            } else {
                deferred.reject(res.data);
            }
            return deferred.promise;
        });
    }

    form<T>(api: string, form: any): IHttpPromise<T>{
        const _path = this.sgCommon.dealPath(api, 'post');
        return this.$http.post(_path, form, {cache:false, headers: {"Content-Type": undefined}, transformRequest: angular.identity})
    }
}

export const proxyHttp: IAddMemberFn = function (module: IModule) {
    module.service('proxyHttp', ProxyHttpImpl);

    return module;
};
