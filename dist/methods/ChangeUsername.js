"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findPlayer_1 = __importDefault(require("../utils/findPlayer"));
class ChangeUsername {
    constructor() {
        this.name = "changeUsername";
        this.schema = {
            properties: {
                discord: { type: "string" },
                newName: { type: "string" }
            },
            required: ["discord", "newName"]
        };
    }
    async run($, discord, newName) {
        let player = await (0, findPlayer_1.default)($, newName);
        if (player)
            throw "Este nome já está em uso!";
        let result = await $.registers.updateOne({ discord }, { $set: { name: newName } }, { upsert: false });
        await $.stats.updateOne({ discord }, { $set: { name: newName } }, { upsert: false });
        if (result.matchedCount === 0)
            throw "Esse jogador não foi encontrado.";
    }
}
exports.default = ChangeUsername;
