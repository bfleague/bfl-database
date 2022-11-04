import { BasicInfo, DBMethod } from "../global";

export default class FindPlayerStats implements DBMethod {
    public name = "findPlayerStats";
    public schema = {
        properties: {
            query: { type: "string" }
        },
        required: ["query"]
    }

    private escapeRegex(text: string) {
        return text?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    
    async run($: BasicInfo, query: string) {
        const regex = new RegExp(this.escapeRegex(query), 'gi');

        let player = await $.stats.findOne({ $or: [
            { name: { $regex: regex } },
            { discord: query.replace(/[\\<>@#&!]/g, "") }
        ] });

        if (!player) throw "Este usuário não foi encontrado.";

        return player;
    }
}