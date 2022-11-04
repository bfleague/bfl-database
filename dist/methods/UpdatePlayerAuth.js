"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePlayerAuth {
    constructor() {
        this.name = "updatePlayerAuth";
        this.schema = {
            properties: {
                name: { type: "string" },
                auth: { type: "string" }
            },
            required: ["auth", "name"]
        };
    }
    async run($, name, auth) {
        let result = await $.registers.updateOne({ name }, { $set: { auth } }, { upsert: false });
        if (result.matchedCount === 0)
            throw "Este jogador não foi encontrado.";
    }
}
exports.default = UpdatePlayerAuth;
