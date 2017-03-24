import {IAddMemberFn} from "../module";
import * as prov from "../provider";
import {Env} from "../enums";


export const provider: IAddMemberFn = function (module: ng.IModule) {

  const serverConfigProvider: ng.IServiceProviderFactory = function () {
    const _this: prov.IServerConfigProvider = {
      env: Env.DEV,
      debug: false,
      protocol: window.location.protocol,
      publicPath: '',
      sites: {},
      wXJsSign: '',
      wXOAuth: '',
      jsApiList: ["checkJsApi",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "hideMenuItems",
        "showMenuItems",
        "hideAllNonBaseMenuItem",
        "showAllNonBaseMenuItem",
        "getLocation",
        "scanQRCode"],
      $get: function () {
        return _this;
      }
    };
    return _this
  };

  const apiConfigProvider: ng.IServiceProviderFactory = function () {
    const _this: prov.IApiConfigProvider = {
      hosts: {},
      post: {},
      get: {},
      $get: function () {
        return _this;
      }
    };
    return _this
  };

  module.provider('apiConfig', apiConfigProvider).provider('serverConfig', serverConfigProvider);

  return module;
};

