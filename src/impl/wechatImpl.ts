/// <reference path="../../dts/wx/index.d.ts" />
import { proxyHttp } from './proxyHttpImpl';
import { IWechat, ICommon } from "../common";
import { IProxyHttp } from "../proxyHttp";
import { IAddMemberFn } from "../module";
import { IModule } from "@types/angular";

class wechatFactory implements IWechat {
    static $inject = ["$q", "proxyHttp", "sgCommon"];
    constructor(private $q: ng.IQService, private proxyHttp: IProxyHttp, private common: ICommon) {
        if(this.isWechat()){
            this.wCJSSignature();
        }
    }
    isWechat(): boolean{
        var ua = navigator.userAgent.toLowerCase();
        return ua.search(/MicroMessenger/i)!==-1
    }
    wCJSSignature<T>(): angular.IPromise<any> {
        const signUrl = this.common.getJsSignUrl()
        return this.proxyHttp.get<wx.ConfigPara>(signUrl, {
            appId: this.common.curSite.appID,
            url: window.location.href.split('#')[0]
        }).then((data: wx.ConfigPara) => {
            return this.$q((resolve, reject) => {
                data.debug = this.common.debug;
                data.jsApiList = this.common.jsApiList;
                wx.config(data);
            })
        })
    }

}

export const wechat: IAddMemberFn = function (module: IModule) {
    return module.service('wechat', wechatFactory);
};
