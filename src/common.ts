
import { IConstBarcodeVres } from "./constants";
import { Site } from "./provider";
export interface ICommon {
    curSite: Site;
    debug: boolean;
    jsApiList: string[];
    dealPath(apiKey: string, method: string): string;
    q(url?: string): any;
    getJsSignUrl(): string;
    getEntrance(): string;
}
export interface IWechat {
    wCJSSignature<T>(): angular.IPromise<any>;
    isWechat(): boolean;
    share();
}