import { BasicInfo, DBMethod } from "../global";
import findPlayer from "../utils/findPlayer";

export default class UpdateStats implements DBMethod {
    public name = "updateStats";
    public schema = {
        properties: {
            name: { type: "string" },
            stat: { type: "string" },
            increment: { type: "number" },
            room: { type: "string" },
            operation: { type: "string" }
        },
        required: ["name", "stat", "room", "increment"]
    }
    
    async run($: BasicInfo, name: string, stat: string, increment: number, room: string, operation?: string) {
        let player = await findPlayer($, name);

        if (!player) throw "Este usuário não foi encontrado.";

        let op: "$set" | "$max" | "$inc";

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