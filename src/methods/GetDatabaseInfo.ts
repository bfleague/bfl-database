import { BasicInfo, DBMethod } from "../global";

export default class GetDatabaseInfo implements DBMethod {
    public name = "getDatabaseInfo";
    public schema = {};

    getRegistersDuringDate({ $, after, before }: { $: BasicInfo, after?: Date | number, before?: Date | number }) {
        let query: any = {};

        if (after) query = { $gte: new Date(after).getTime() }
        if (before) query = { ...query, $lt: new Date(before).getTime() };

        return new Promise((resolve, reject) => {
            $.registers.find({ 
                createdAt: query
            }).toArray((err, result) => {
                if (err) reject(err);
                
                resolve(result);
            });
        });
    }

    getTodayDate() {
        return new Date(new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})).toJSON().slice(0,10).replace(/-/g,'/'));
    }

    async run($: BasicInfo) {
        const stats = await $.registers.stats();

        const todayDate = this.getTodayDate();

        const regSize = stats.count;

        const regSizeToday: any = await this.getRegistersDuringDate({ $, after: todayDate });
        const regSizeYesterday: any = await this.getRegistersDuringDate({ $, before: this.getTodayDate(), after: todayDate.setDate(todayDate.getDate() - 1) });
        const regSizeWeek: any = await this.getRegistersDuringDate({ $, after: todayDate.setDate(todayDate.getDate() - 6) });

        return {
            count: regSize,
            today: regSizeToday.length,
            yesterday: regSizeYesterday.length,
            week: regSizeWeek.length,
            last: regSizeToday[regSizeToday.length - 1]
        };
    }
}