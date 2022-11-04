import { BasicInfo, DBMethod } from "../global";

export default class ChangePassword implements DBMethod {
    public name = "changePassword";
    public schema = {
        properties: {
            discord: { type: "string" },
            password: { type: "string" }
        },
        required: ["discord", "password"]
    }
    
    async run($: BasicInfo, discord: string, password: string) {
        let result = await $.registers.updateOne({ discord }, { $set: { password } }, { upsert: false });

        if (result.matchedCount === 0) throw "Esse jogador não foi encontrado.";
    }
}