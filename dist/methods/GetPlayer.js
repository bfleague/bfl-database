"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findPlayer_1 = __importDefault(require("../utils/findPlayer"));
class GetPlayer {
    constructor() {
        this.name = "getPlayer";
        this.schema = {
            properties: {
                query: { type: "string" }
            },
            required: ["query"]
        };
    }
    async run($, query) {
        let player = await (0, findPlayer_1.default)($, query);
        if (!player)
            throw "Este usuário não foi encontrado.";
        return player;
    }
}
exports.default = GetPlayer;
