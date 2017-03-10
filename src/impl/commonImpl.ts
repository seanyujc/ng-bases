import * as angular from "angular";
import { IAddMemberFn } from "../module";
import { IConstBarcodeVres } from '../constants'
import IModule = angular.IModule;
import { IApiConfigProvider, IServerConfigProvider, Site, Host } from "../provider";
import { ICommon } from "../common";
import { Env } from "../enums";

class CommonFactory implements ICommon {

    static $inject = ["$q", "$http", "apiConfig", "serverConfig"];

    private env: Env;
    public debug: boolean;
    private protocol: string;
    curSite: Site;
    private domain: string;
    private localSite: string;
    private entrance: string;
    private jsSignUrl: string;
    public jsApiList: string[];

    constructor(private $q: ng.IQService, private $http: ng.IHttpService, private apiConfig: IApiConfigProvider, private serverConfig: IServerConfigProvider) {
        const URL_TPL = '//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=STATE';

        this.env = serverConfig.env;
        this.debug = serverConfig.debug;
        this.protocol = serverConfig.protocol;
        this.curSite = serverConfig.sites[this.env];
        this.domain = this.curSite.remote;
        this.localSite = this.protocol + '//' + this.curSite.local + serverConfig.publicPath;
        this.entrance = URL_TPL.replace(/\{DOMAIN}/, this.curSite.remote).replace(/\{HOST_API}/, serverConfig.wXOAuth)
            .replace('APPID', this.curSite.appID);
        this.jsSignUrl = '//' + this.curSite.remote + serverConfig.wXJsSign;
        this.jsApiList = serverConfig.jsApiList;
    }

    trim(s: string): string {
        return s.replace(/^[\s\t ]+/g, '');
    }

    dealPath(apiKey = '', method = 'get'): string {
        let _api = '', _url = apiKey;
        method = method.toLocaleLowerCase();
        if (!this.apiConfig[method]) return '';
        if (this.apiConfig[method][apiKey]) {
            _api = this.apiConfig[method][apiKey];
            if (_api.indexOf(':') !== -1) {
                _url = '//{DOMAIN}{HOST}{API}';
                let _p = _api.split(':');
                _p[0] = this.trim(_p[0]);
                _p[1] = this.trim(_p[1]);
                let host: Host = this.apiConfig.hosts[_p[0]];
                let _domain = host.domain ? host.domain : this.domain;
                _url = _url.replace(/\{DOMAIN}/, _domain).replace(/\{HOST}/, host.dir).replace(/\{API}/, _p[1]);
            } else {
                _url = _api;
            }
        }

        return _url;
    }

    getLocalSite(): string {
        return this.localSite;
    }

    getEntrance(): string {
        return this.entrance;
    }

    getJsSignUrl(): string {
        return this.jsSignUrl;
    }

    q(search = window.location.search): any {
        var q = {}, _q;
        if (search.split('?')[1]) {
            _q = search.split('?')[1].split('&');
            for (var i = 0, l = _q.length; i < l; i++) {
                const _t = _q[i].split('=');
                q[_t[0]] = _t[1];
            }
        }
        return q;
    }
}

export const common: IAddMemberFn = function (module: IModule) {
    return module.service('sgCommon', CommonFactory);
};
