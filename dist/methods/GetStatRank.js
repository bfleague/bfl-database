"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetStatRank {
    constructor() {
        this.name = "getStatRank";
        this.schema = {
            properties: {
                stat: { type: "string" },
                room: { type: "string" }
            },
            required: ["stat", "room"]
        };
    }
    async run($, stat, room) {
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
            if ((results === null || results === void 0 ? void 0 : results.length) === 0)
                throw "Não encontrado.";
            return results;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = GetStatRank;
