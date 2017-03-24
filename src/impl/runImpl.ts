import {IAddMemberFn} from "../module";
import * as ng from '@types/angular';

/**
 * Created by seany on 2017/2/8.
 */
export const run: IAddMemberFn = function (module: ng.IModule) {

  return module;
};