
import {IConstBarcodeVres} from "./constants";
export interface ICommon{
    debug: boolean;
    dealPath(apiKey:string, method:string): string;
    q(url:string):any;
}