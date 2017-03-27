import * as angular from "angular";
import { IAddMemberFn } from "../module";
import { ICommon } from "../common";
import { ISgResult, IProxyHttp } from "../proxyHttp";
import * as ng from '@types/angular';

class ProxyHttpImpl implements IProxyHttp {

  static $inject = ["$q", "$http", "sgCommon"];

  constructor(private $q: ng.IQService, private $http: ng.IHttpService, private sgCommon: ICommon) {
  }

  private tf = <T>(res: ng.IHttpPromiseCallbackArg<ISgResult<T>>): angular.IPromise<T | any> => {
    return this.$q<T>((resolve, reject) => {
      if (res.data.code === 0 || res.data.code.toString() === "0") {
        resolve(res.data.data);
      } else {
        reject(res.data);
      }
      if (this.sgCommon.debug) {
        window.alert(res.config.url + "\n params: \n" + JSON.stringify(res.config.params))
      }
    });
  };

  get<T>(api: string, params: any): angular.IPromise<T | any> {
    const _path = this.sgCommon.dealPath(api, 'get');
    return this.$http.get<ISgResult<T>>(_path, {
      params,
      cache: false
    }).then(this.tf);
  }

  post<T>(api: string, params: any): angular.IPromise<T | any> {
    const _path = this.sgCommon.dealPath(api, 'post');
    return this.$http.post<ISgResult<T>>(_path, params, {
      cache: false
    }).then(this.tf);
  }

  form<T>(api: string, form: FormData): angular.IPromise<T | any> {
    const _path = this.sgCommon.dealPath(api, 'post');
    return this.$http.post(_path, form, {
      cache: false,
      headers: { "Content-Type": undefined },
      transformRequest: angular.identity
    }).then(this.tf);
  }
}

export const proxyHttp: IAddMemberFn = function (module: ng.IModule) {
  return module.service('proxyHttp', ProxyHttpImpl);
};
