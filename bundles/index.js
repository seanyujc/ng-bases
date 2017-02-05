"use strict";
/**
 * Created by sean on 2017/2/3.
 */
var moduleImpl_1 = require('./impl/moduleImpl');
var commonImpl_1 = require('./impl/commonImpl');
var providerImpl_1 = require("./impl/providerImpl");
var constantsImpl_1 = require("./impl/constantsImpl");
var proxyHttpImpl_1 = require("./impl/proxyHttpImpl");
commonImpl_1.common(moduleImpl_1.ngSgCommon);
providerImpl_1.provider(moduleImpl_1.ngSgCommon);
constantsImpl_1.constants(moduleImpl_1.ngSgCommon);
proxyHttpImpl_1.proxyHttp(moduleImpl_1.ngSgCommon);
//# sourceMappingURL=index.js.map