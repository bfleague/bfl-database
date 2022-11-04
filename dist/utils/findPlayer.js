"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findPlayer($, query) {
    return await $.registers.findOne({ $or: [
            { name: query },
            { discord: query.replace(/[\\<>@#&!]/g, "") }
        ] });
}
exports.default = findPlayer;
