"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
function apiAuthMiddlewareFactory() {
    var config = require('config');
    return function (authParams) {
        return function (req, res, next) {
            if (req.header('Service-Auth') !== config.get('serviceApiToken')) {
                return res.status(401).end('Unauthorized api');
            }
            next();
        };
    };
}
var internalApiAuthMiddleware = apiAuthMiddlewareFactory();
exports.internalApiAuthMiddleware = internalApiAuthMiddleware;
// JWT
function jwtAuthMiddlewareFactory() {
    return function (config) {
        return function (req, res, next) {
            // This can be extended by using services or repos from the container to check roles etc
            passport.authenticate('jwt', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).end('Unauthorized jwt');
                }
                req.logIn(user, function (loginErr) {
                    if (loginErr) {
                        return next(loginErr);
                    }
                    next();
                });
            })(req, res, next);
        };
    };
}
var jwtAuthMiddleware = jwtAuthMiddlewareFactory();
exports.jwtAuthMiddleware = jwtAuthMiddleware;
// Password / username
function localLoginMiddlewareFactory() {
    return function (config) {
        return function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).end('Unauthorized local');
                }
                req.logIn(user, function (error) {
                    if (error) {
                        return next(error);
                    }
                    next();
                });
            })(req, res, next);
        };
    };
}
var localAuthMiddleware = localLoginMiddlewareFactory();
exports.localAuthMiddleware = localAuthMiddleware;
//# sourceMappingURL=auth.js.map