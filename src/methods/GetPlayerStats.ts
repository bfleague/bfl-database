import { BasicInfo, DBMethod } from "../global";
import findPlayer from "../utils/findPlayer";

export default class GetPlayerStats implements DBMethod {
    public name = "getPlayerStats";
    public schema = {
        properties: {
            query: { type: "string" }
        },
        required: ["query"]
    }
    
    async run($: BasicInfo, query: string) {
        const player = await findPlayer($, query);

        if (!player) throw "Este usuário não foi encontrado.";

        const stats = $.stats.findOne({ discord: player.discord });

        if (!stats) return 0;
    
        return stats;
    }
}