import * as angular from "angular";
import IServiceProvider = angular.IServiceProvider;
import {Env} from "./enums";


export interface Site {
    local: string;
    remote: string;
    appID: string;
}

export interface Host {
    domain?: string;
    dir: string;
}

export declare type Hosts = {[key:string]:Host}
export declare type Sites = {[key:string]:Site}

export interface IApiConfigProvider extends IServiceProvider {
    hosts: Hosts;
    post: any;
    get: any;
}

export interface IServerConfigProvider extends IServiceProvider {
    env: Env;
    debug: boolean;
    publicPath: string;
    sites: Sites;
    wXJsSign: string;
    wXOAuth: string;
}