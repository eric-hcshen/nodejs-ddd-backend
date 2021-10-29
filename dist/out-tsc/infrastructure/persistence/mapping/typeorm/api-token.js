"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var base_1 = require("./base");
exports.apiTokenMapping = new typeorm_1.EntitySchema({
    name: 'ApiToken',
    tableName: 'api_tokens',
    columns: __assign(__assign({}, base_1.baseColumnsSchemaPart), { accessToken: {
            type: String,
        } }),
});
//# sourceMappingURL=api-token.js.map