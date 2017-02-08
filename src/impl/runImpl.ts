import IModule = angular.IModule;
import {IAddMemberFn} from "../module";
/**
 * Created by seany on 2017/2/8.
 */
export const run: IAddMemberFn = function (module: IModule) {

    return module;
};