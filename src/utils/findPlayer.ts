import { BasicInfo } from "../global";

export default async function findPlayer($: BasicInfo, query: string) {
    return await $.registers.findOne({ $or: [
        { name: query },
        { discord: query.replace(/[\\<>@#&!]/g, "") }
    ] });
}