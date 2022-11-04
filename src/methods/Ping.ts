import { BasicInfo, DBMethod } from "../global";

export default class Ping implements DBMethod {
    public name = "ping";
    public schema = {
        properties: {}
    }
    
    async run($: BasicInfo) {
        return;
    }
}