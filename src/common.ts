import { Site } from "./provider";
export interface ICommon {
    curSite: Site;
    debug: boolean;
    jsApiList: string[];
    dealPath(apiKey: string, method: string): string;
    q(url?: string): any;
    getJsSignUrl(): string;
    getEntrance(): string;
    getLocalSite(): string;
}
export interface wechatShareParam extends wx.MenuShareAppMessagePara, wx.MenuShareQQPara,
    wx.MenuShareQZonePara, wx.MenuShareTimelinePara, wx.MenuShareWeiboPara {

}
export interface IWechat {
    wCJSSignature<T>(): angular.IPromise<any>;
    isWechat(): boolean;
    shareJoint(param: wechatShareParam);
}