import * as angular from "angular";
import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
import IServiceProviderFactory = angular.IServiceProviderFactory;
import IServiceProvider = angular.IServiceProvider;
import {IApiConfigProvider, IServerConfigProvider, Site, Host} from "../provider";
import {Env} from "../enums";


export const provider: IAddMemberFn = function (module: IModule) {

    const serverConfigProvider: IServiceProviderFactory = function () {
        const _this: IServerConfigProvider = {
            env: Env.Dev,
            debug: false,
            publicPath: '',
            sites: {},
            wXJsSign: '',
            wXOAuth: '',
            $get: function () {
                return _this;
            }
        };
        return _this
    };

    const apiConfigProvider: IServiceProviderFactory = function () {
        const _this: IApiConfigProvider = {
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

