/// <reference path="../wx/index.d.ts" />
import { proxyHttp } from './proxyHttpImpl';
import { IWechat, ICommon } from "../common";
import { IProxyHttp } from "../proxyHttp";

class wechatFactory implements IWechat {
    static $inject = ["$q", "proxyHttp", "sgCommon"];
    constructor(private $q: ng.IQService, private proxyHttp: IProxyHttp, private common: ICommon) {

    }
    wCJSSignature<T>(): angular.IPromise<T> {
        const signUrl = this.common.getJsSignUrl()
        return this.proxyHttp.get<wx.ConfigPara>(signUrl, {
            appId: this.common.curSite.appID,
            url: window.location.href.split('#')[0]
        }).then((data) => {
            return this.$q((resolve, reject) => { 
                data.
            })
        })
    }

}