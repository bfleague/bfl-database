"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetDatabaseInfo {
    constructor() {
        this.name = "getDatabaseInfo";
        this.schema = {};
    }
    getRegistersDuringDate({ $, after, before }) {
        let query = {};
        if (after)
            query = { $gte: new Date(after).getTime() };
        if (before)
            query = Object.assign(Object.assign({}, query), { $lt: new Date(before).getTime() });
        return new Promise((resolve, reject) => {
            $.registers.find({
                createdAt: query
            }).toArray((err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getTodayDate() {
        return new Date(new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })).toJSON().slice(0, 10).replace(/-/g, '/'));
    }
    async run($) {
        const stats = await $.registers.stats();
        const todayDate = this.getTodayDate();
        const regSize = stats.count;
        const regSizeToday = await this.getRegistersDuringDate({ $, after: todayDate });
        const regSizeYesterday = await this.getRegistersDuringDate({ $, before: this.getTodayDate(), after: todayDate.setDate(todayDate.getDate() - 1) });
        const regSizeWeek = await this.getRegistersDuringDate({ $, after: todayDate.setDate(todayDate.getDate() - 6) });
        return {
            count: regSize,
            today: regSizeToday.length,
            yesterday: regSizeYesterday.length,
            week: regSizeWeek.length,
            last: regSizeToday[regSizeToday.length - 1]
        };
    }
}
exports.default = GetDatabaseInfo;
