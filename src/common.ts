
import {IConstBarcodeVres} from "./constants";
export interface ICommon{
    dealPath(apiKey:string, method:string): string;
    q(url:string):any;
}