"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChangePassword {
    constructor() {
        this.name = "changePassword";
        this.schema = {
            properties: {
                discord: { type: "string" },
                password: { type: "string" }
            },
            required: ["discord", "password"]
        };
    }
    async run($, discord, password) {
        let result = await $.registers.updateOne({ discord }, { $set: { password } }, { upsert: false });
        if (result.matchedCount === 0)
            throw "Esse jogador não foi encontrado.";
    }
}
exports.default = ChangePassword;
