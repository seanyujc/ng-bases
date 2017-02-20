import * as angular from "angular";
import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
import {ICommon} from "../common";
import IHttpPromise = angular.IHttpPromise;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import {ISgResult, IProxyHttp} from "../proxyHttp";

class ProxyHttpImpl implements IProxyHttp {

    static $inject = ["$q", "$http", "sgCommon"];

    constructor(private $q: ng.IQService, private $http: ng.IHttpService, private sgCommon: ICommon) {
    }

    private tf = <T>(res: IHttpPromiseCallbackArg<ISgResult<T>>) => {
        const deferred = this.$q.defer();
        if (res.data.code === 0 || res.data.code.toString() === "0") {
            deferred.resolve(res.data.data);
        } else {
            deferred.reject(res.data);
        }
        if (this.sgCommon.debug) {
            window.alert(res.config.url+"\n params: \n"+ JSON.stringify(res.config.params))
        }
        return deferred.promise;
    };

    get<T>(api: string, params: any): IHttpPromise<T> {
        const _path = this.sgCommon.dealPath(api, 'get');
        return this.$http.get<ISgResult<T>>(_path, {
            params,
            cache: false
        }).then(this.tf);
    }

    post<T>(api: string, params: any): IHttpPromise<T> {
        const _path = this.sgCommon.dealPath(api, 'get');
        return this.$http.post<ISgResult<T>>(_path, params, {
            cache: false
        }).then(this.tf);
    }

    form<T>(api: string, form: FormData): IHttpPromise<T> {
        const _path = this.sgCommon.dealPath(api, 'post');
        return this.$http.post(_path, form, {
            cache: false,
            headers: {"Content-Type": undefined},
            transformRequest: angular.identity
        }).then(this.tf);
    }
}

export const proxyHttp: IAddMemberFn = function (module: IModule) {
    return module.service('proxyHttp', ProxyHttpImpl);
};
