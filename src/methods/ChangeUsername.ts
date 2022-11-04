import { BasicInfo, DBMethod } from "../global";
import findPlayer from "../utils/findPlayer";

export default class ChangeUsername implements DBMethod {
    public name = "changeUsername";
    public schema = {
        properties: {
            discord: { type: "string" },
            newName: { type: "string" }
        },
        required: ["discord", "newName"]
    }
    
    async run($: BasicInfo, discord: string, newName: string) {
        let player = await findPlayer($, newName);

        if (player) throw "Este nome já está em uso!";
        
        let result = await $.registers.updateOne({ discord }, { $set: { name: newName } }, { upsert: false });

        await $.stats.updateOne({ discord }, { $set: { name: newName } }, { upsert: false });

        if (result.matchedCount === 0) throw "Esse jogador não foi encontrado.";
    }
}