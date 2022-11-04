import { BasicInfo, DBMethod } from "../global";

export default class GetStatRank implements DBMethod {
    public name = "getStatRank";
    public schema = {
        properties: {
            stat: { type: "string" },
            room: { type: "string" }
        },
        required: ["stat", "room"]
    }
    
    async run($: BasicInfo, stat: string, room: string) {
        try {
            const roomStatStr = `${room}.${stat}`;
    
            const results = await $.stats.aggregate([
                {
                    $match: {
                        [roomStatStr]: { $exists: true }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: "$name",
                        score: "$" + roomStatStr
                    }
                }, {
                    $sort: {
                        score: -1
                    }
                }, {
                    $limit: 10
                }
            ]).toArray();

            if (results?.length === 0) throw "Não encontrado.";

            return results;
        } catch (err) {
            throw err;
        }
    }
}