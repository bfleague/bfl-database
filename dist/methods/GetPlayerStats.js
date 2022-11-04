"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findPlayer_1 = __importDefault(require("../utils/findPlayer"));
class GetPlayerStats {
    constructor() {
        this.name = "getPlayerStats";
        this.schema = {
            properties: {
                query: { type: "string" }
            },
            required: ["query"]
        };
    }
    async run($, query) {
        const player = await (0, findPlayer_1.default)($, query);
        if (!player)
            throw "Este usuário não foi encontrado.";
        const stats = $.stats.findOne({ discord: player.discord });
        if (!stats)
            return 0;
        return stats;
    }
}
exports.default = GetPlayerStats;
