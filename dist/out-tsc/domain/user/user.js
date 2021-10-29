"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("../base-entity");
var ApiToken = /** @class */ (function (_super) {
    __extends(ApiToken, _super);
    function ApiToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApiToken;
}(base_entity_1.BaseEntity));
exports.ApiToken = ApiToken;
var AuthToken = /** @class */ (function (_super) {
    __extends(AuthToken, _super);
    function AuthToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AuthToken;
}(base_entity_1.BaseEntity));
exports.AuthToken = AuthToken;
var UserRole = /** @class */ (function (_super) {
    __extends(UserRole, _super);
    function UserRole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserRole;
}(base_entity_1.BaseEntity));
exports.UserRole = UserRole;
//# sourceMappingURL=user.js.map