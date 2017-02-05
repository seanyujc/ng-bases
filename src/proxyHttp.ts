import IHttpPromise = angular.IHttpPromise;
export interface IProxyHttp{
    get<T>(api:string, params: any):IHttpPromise<T>;
}

export interface ISgResult<T>{
    code: number;
    msg: string;
    data: T
}