"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE = {
    Controllers: {
        UserController: Symbol('UserController')
    },
    Repositories: {
        Domain: {
            User: Symbol('UserRepository'),
            UserRole: Symbol('UserRoleRepository'),
        }
    },
    Services: {
        Application: {
            Auth: Symbol('AuthService'),
        },
        Infrastructure: {
            DataInitializer: Symbol('DataInitializerService')
        }
    }
};
//# sourceMappingURL=types.js.map