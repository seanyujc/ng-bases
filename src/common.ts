
import { IConstBarcodeVres } from "./constants";
import { Site } from "./provider";
export interface ICommon{
    curSite: Site;
    debug: boolean;
    dealPath(apiKey:string, method:string): string;
    q(url:string):any;
    getJsSignUrl(): string 
}
export interface IWechat{
    wCJSSignature<T>():angular.IPromise<T>;
}