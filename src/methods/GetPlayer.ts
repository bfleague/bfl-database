import { BasicInfo, DBMethod } from "../global";
import findPlayer from "../utils/findPlayer";

export default class GetPlayer implements DBMethod {
    public name = "getPlayer";
    public schema = {
        properties: {
            query: { type: "string" }
        },
        required: ["query"]
    }
    
    async run($: BasicInfo, query: string) {
        let player = await findPlayer($, query);

        if (!player) throw "Este usuário não foi encontrado.";
    
        return player;
    }
}