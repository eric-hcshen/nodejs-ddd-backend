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
var user_1 = require("../../../../domain/user/user");
var base_1 = require("./base");
exports.userMapping = new typeorm_1.EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: __assign(__assign({}, base_1.baseColumnsSchemaPart), { name: {
            type: String,
        }, email: {
            type: String,
        }, password: {
            type: String,
        }, language: {
            type: String,
        }, locale: {
            type: String,
        }, passwordResetToken: {
            type: String,
        }, passwordResetExpires: {
            type: Date,
        }, 
        // Hacky hack: TypeOrm does not support objects as type yet in EntitySchema (it does for @Entity),
        // and it does not support relatonships
        /* tslint:disable */
        tokens: {
            type: user_1.ApiToken
        }, apiTokens: {
            type: user_1.AuthToken
        }, roles: {
            type: user_1.UserRole
        } }),
});
//# sourceMappingURL=user.js.map