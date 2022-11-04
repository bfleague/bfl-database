"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindPlayerStats {
    constructor() {
        this.name = "findPlayerStats";
        this.schema = {
            properties: {
                query: { type: "string" }
            },
            required: ["query"]
        };
    }
    escapeRegex(text) {
        return text === null || text === void 0 ? void 0 : text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    async run($, query) {
        const regex = new RegExp(this.escapeRegex(query), 'gi');
        let player = await $.stats.findOne({ $or: [
                { name: { $regex: regex } },
                { discord: query.replace(/[\\<>@#&!]/g, "") }
            ] });
        if (!player)
            throw "Este usuário não foi encontrado.";
        return player;
    }
}
exports.default = FindPlayerStats;
