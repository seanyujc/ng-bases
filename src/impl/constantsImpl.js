"use strict";
exports.constants = function (module) {
    module
        .constant('BARCODE_VRES', {
        NOIS: 1,
        ABROAD: 2,
        VALIERR: 3,
        SUCCESS: 4 // 验证成功
    });
    return module;
};
