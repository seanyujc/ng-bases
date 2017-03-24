/// <reference path="../../dts/wx/index.d.ts" />
import { proxyHttp } from './proxyHttpImpl';
import { IWechat, ICommon, wechatShareParam } from "../common";
import { IProxyHttp } from "../proxyHttp";
import { IAddMemberFn } from "../module";



class wechatFactory implements IWechat {
    shareJoint(param: wechatShareParam) {
        wx.onMenuShareAppMessage(param);
        wx.onMenuShareQQ(param);
        wx.onMenuShareQZone(param);
        wx.onMenuShareTimeline(param);
        wx.onMenuShareWeibo(param)
    }

    isWechat(): boolean {
        var ua = navigator.userAgent.toLowerCase();
        return ua.search(/MicroMessenger/i) !== -1
    }
    wCJSSignature<T>(): angular.IPromise<any> {
        const signUrl = this.common.getJsSignUrl();
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
    static $inject = ["$q", "proxyHttp", "sgCommon"];
    constructor(private $q: ng.IQService, private proxyHttp: IProxyHttp, private common: ICommon) {
        if (this.isWechat()) {
            this.wCJSSignature();
        }
    }

}

export const wechat: IAddMemberFn = function (module: ng.IModule) {
    return module.service('wechat', wechatFactory);
};
