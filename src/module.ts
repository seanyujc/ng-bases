import * as angular from "angular";
import IModule = angular.IModule;

export interface IAddMemberFn {
    (module: IModule): IModule;
}



