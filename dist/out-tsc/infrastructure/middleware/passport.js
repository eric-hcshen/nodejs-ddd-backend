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
var passport = require("passport");
var passportLocal = require("passport-local");
var passportJwt = require("passport-jwt");
var types_1 = require("../dependency_injection/types");
function loadPassport(container) {
    var _this = this;
    var localStrategy = passportLocal.Strategy;
    var jwtStrategy = passportJwt.Strategy;
    var config = require('config');
    var authService = container.get(types_1.TYPE.Services.Application.Auth);
    passport.serializeUser(function (user, done) {
        done(undefined, user.id);
    });
    passport.deserializeUser(function (id, done) { return __awaiter(_this, void 0, void 0, function () {
        var user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, authService.get(id)];
                case 1:
                    user = _a.sent();
                    done(undefined, user);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    done(e_1, undefined);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Sign in using Email and Password.
     */
    passport.use(new localStrategy({ usernameField: 'email' }, function (email, password, done) {
        authService.findByEmail(email.toLowerCase()).then(function (user) {
            if (!user) {
                return done(undefined, false, { message: "Email " + email + " not found." });
            }
            authService.comparePassword(user, password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: 'Invalid email or password.' });
            });
        }).catch(function (err) {
            return done(err);
        });
    }));
    /**
     * OAuth Strategy Overview
     *
     * - User is already logged in.
     *   - Check if there is an existing account with a provider id.
     *     - If there is, return an error message. (Account merging not supported)
     *     - Else link new OAuth account with currently logged-in user.
     * - User is not logged in.
     *   - Check if it's a returning user.
     *     - If returning user, sign in and we are done.
     *     - Else check if there is an existing account with user's email.
     *       - If there is, return an error message.
     *       - Else create a new account.
     */
    var opts = {
        // jwtFromRequest : passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('apiKey'),
    };
    passport.use(new jwtStrategy(opts, function (jwtPayload, done) {
        authService.get(jwtPayload.id).then(function (user) {
            if ((user && "" + user.id !== "" + jwtPayload.id)) {
                return done(undefined, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
                // or you could create a new account
            }
        }).catch(function (err) {
            return done(err, false);
        });
    }));
    // /**
    //  * Login Required middleware.
    //  */
    // export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    //     if (req.session.isAuthenticated()) {
    //         return next();
    //     }
    //     res.redirect('/login');
    // };
    //
    // /**
    //  * Authorization Required middleware.
    //  */
    // export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    //     const provider = req.path.split('/').slice(-1)[0];
    //
    //     if (_.find(req.session.user.tokens, { kind: provider })) {
    //         next();
    //     } else {
    //         res.redirect(`/auth/${provider}`);
    //     }
    // };
}
exports.loadPassport = loadPassport;
//# sourceMappingURL=passport.js.map