import * as angular from "angular";
import IHttpPromise = angular.IHttpPromise;
export interface IProxyHttp{
    get<T>(api:string, params: any):IHttpPromise<any>;
    post<T>(api: string, params: any): IHttpPromise<any>;
    form<T>(api: string, form: any): IHttpPromise<any>;
}

export interface ISgResult<T>{
    code: number;
    msg: string;
    data: T
}