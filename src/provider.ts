import IServiceProvider = angular.IServiceProvider;

export interface IApiConfigProvider extends IServiceProvider{
    basePath:any;
    post:any;
    get:any;
}

export interface IServerConfigProvider extends IServiceProvider{
    DEV:string[];
    TEST:string[];
    PRO:string[];
}