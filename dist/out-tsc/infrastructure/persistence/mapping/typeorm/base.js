"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseColumnsSchemaPart = {
    id: {
        type: String,
        primary: true,
        generated: true,
        objectId: true
    },
    created: {
        type: Date,
        nullable: true,
        createDate: true
    },
    updated: {
        type: Date,
        nullable: true,
        updateDate: true
    },
    deleted: {
        type: Date,
        nullable: true
    },
};
//# sourceMappingURL=base.js.map