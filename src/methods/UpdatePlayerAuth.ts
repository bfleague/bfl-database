import { BasicInfo, DBMethod } from "../global";

export default class UpdatePlayerAuth implements DBMethod {
    public name = "updatePlayerAuth";
    public schema = {
        properties: {
            name: { type: "string" },
            auth: { type: "string" }
        },
        required: ["auth", "name"]
    }
    
    async run($: BasicInfo, name: string, auth: string) {
        let result = await $.registers.updateOne({ name }, { $set: { auth } }, { upsert: false });

        if (result.matchedCount === 0) throw "Este jogador não foi encontrado.";
    }
}