import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
import IServiceProviderFactory = angular.IServiceProviderFactory;
import IServiceProvider = angular.IServiceProvider;
import {IApiConfigProvider, IServerConfigProvider} from "../provider";


export const provider: IAddMemberFn = function (module: IModule) {

    const apiConfigProvider: IServiceProviderFactory = function () {
        const _this: IApiConfigProvider = {
            basePath: {},
            post: {},
            get: {},
            $get: function () {
                return _this;
            }
        };
        return _this
    };

    const serverConfigProvider: IServiceProviderFactory = function () {
        const _this: IServerConfigProvider = {
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

