"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_config_1 = require("./dependency_injection/inversify.config");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var types_1 = require("./dependency_injection/types");
var passport_1 = require("./middleware/passport");
exports.container = new inversify_1.Container();
function runDataInitializer() {
    return __awaiter(this, void 0, void 0, function () {
        var initializer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initializer = exports.container.get(types_1.TYPE.Services.Infrastructure.DataInitializer);
                    return [4 /*yield*/, initializer.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.runDataInitializer = runDataInitializer;
function createContainer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.container.loadAsync(inversify_config_1.bindings)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, runDataInitializer()];
                case 2:
                    _a.sent();
                    passport_1.loadPassport(exports.container);
                    return [2 /*return*/, exports.container];
            }
        });
    });
}
exports.createContainer = createContainer;
function createServer(recreate) {
    if (recreate === void 0) { recreate = false; }
    return __awaiter(this, void 0, void 0, function () {
        var app, allowCrossDomain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (recreate) {
                        exports.server = undefined;
                        exports.container = new inversify_1.Container();
                    }
                    if (exports.server) {
                        return [2 /*return*/, exports.server];
                    }
                    return [4 /*yield*/, createContainer()];
                case 1:
                    _a.sent();
                    app = new inversify_express_utils_1.InversifyExpressServer(exports.container);
                    allowCrossDomain = function (req, res, next) {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                        next();
                    };
                    app.setConfig(function (application) {
                        var config = require('config');
                        // add body parser
                        application.use(bodyParser.urlencoded({
                            extended: true,
                            limit: '100mb'
                        }));
                        application.use(bodyParser.json({
                            limit: '100mb'
                        }));
                        application.use(allowCrossDomain);
                        application.use(session({ secret: config.get('sessionKey'), resave: true, saveUninitialized: true }));
                        application.use(passport.initialize());
                        application.use(passport.session());
                        application.use(function (req, res, next) {
                            res.locals.user = req.session.user;
                            next();
                        });
                    });
                    exports.server = app.build();
                    return [2 /*return*/, exports.server];
            }
        });
    });
}
exports.createServer = createServer;
// Main
if (process.env.NODE_ENV !== 'tests') {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var port, serv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    port = 3000;
                    return [4 /*yield*/, createServer()];
                case 1:
                    serv = _a.sent();
                    serv.listen(port, function () {
                        console.log("Server running at http://127.0.0.1:" + port + "/");
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
//# sourceMappingURL=main.js.map