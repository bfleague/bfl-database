"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findPlayer_1 = __importDefault(require("../utils/findPlayer"));
class UpdateStats {
    constructor() {
        this.name = "updateStats";
        this.schema = {
            properties: {
                name: { type: "string" },
                stat: { type: "string" },
                increment: { type: "number" },
                room: { type: "string" },
                operation: { type: "string" }
            },
            required: ["name", "stat", "room", "increment"]
        };
    }
    async run($, name, stat, increment, room, operation) {
        let player = await (0, findPlayer_1.default)($, name);
        if (!player)
            throw "Este usuário não foi encontrado.";
        let op;
        switch (operation) {
            case "set":
                op = "$set";
                break;
            case "setIfBigger":
                op = "$max";
                break;
            default:
                op = "$inc";
                break;
        }
        $.stats.updateOne({ discord: player.discord }, {
            [op]: { [room + "." + stat]: increment },
            $setOnInsert: { discord: player.discord, name }
        }, { upsert: true });
    }
}
exports.default = UpdateStats;
