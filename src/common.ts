
import {IConstBarcodeVres} from "./constants";
export interface ICommon{
    thenDefer(cb: Function): Function;
    dealPath(api:string, type:string): string;
    isWeixin():boolean;
    isIos():boolean;
    isIosWx():boolean;
    isIPhoneV(v:number):boolean;
    isAndroidV(v:number):boolean;
    q(url:string):any;
    validateBarcode(code: string):IConstBarcodeVres
    localStorage:any;
}