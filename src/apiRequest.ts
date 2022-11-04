import { Db, MongoClient } from "mongodb";
import { Request, Response } from 'express';
import { BasicInfo, Collections, DBMethod, ResponseType } from "./global";
import { validate } from "jsonschema";

import { logResponse } from "./log";
import "colors";

import RegisterPlayer from "./methods/RegisterPlayer";
import GetPlayer from "./methods/GetPlayer";
import UpdatePlayerAuth from "./methods/UpdatePlayerAuth";
import ChangePassword from "./methods/ChangePassword";
import ChangeUsername from "./methods/ChangeUsername";
import UpdateStats from "./methods/UpdateStats";
import GetPlayerStats from "./methods/GetPlayerStats";
import GetStatRank from "./methods/GetStatRank";
import FindPlayer from "./methods/FindPlayer";
import FindPlayerStats from "./methods/FindPlayerStats";
import GetDatabaseInfo from "./methods/GetDatabaseInfo";
import Ping from "./methods/Ping";

const methodList: DBMethod[] = [
    RegisterPlayer,
    GetPlayer,
    UpdatePlayerAuth,
    ChangePassword,
    ChangeUsername,
    UpdateStats,
    GetPlayerStats,
    GetStatRank,
    FindPlayer,
    FindPlayerStats,
    GetDatabaseInfo,
    Ping
].map(method => new method());

function getSchema() {
    return {
        type: "array",
        properties: {
            method: { type: "string" },
            params: {
                type: "array",
                items: {}
            },
        },
        required: ["method", "params"]
    }
}

function sendAPIResponse(res: Response, type: ResponseType, message: any) {
    return res.status(200).json({ type, message });
}

export async function apiRequest(client: MongoClient, db: Db, req: Request, res: Response, info: any) {    
    if (info.method == null) return sendAPIResponse(res, ResponseType.InternalError, "Method not specified");
    if (info.params == null) return sendAPIResponse(res, ResponseType.InternalError, "Parameters not specified");
    if (typeof info.method !== "string") return sendAPIResponse(res, ResponseType.InternalError, "Method must be string");
    if (!Array.isArray(info.params)) return sendAPIResponse(res, ResponseType.InternalError, "Invalid params");

    const method = methodList.find(m => m.name === info.method);

    if (method == null) return sendAPIResponse(res, ResponseType.InternalError, "Method not found");

    let schema = getSchema();
    schema.properties.params.items = method.schema;

    let validation = validate(info.params, schema, { allowUnknownAttributes: false });

    if (!validation.valid) {
        console.log(JSON.stringify(validation.errors));
        return sendAPIResponse(res, ResponseType.InternalError, `Invalid schema`);
    }

    try {
        const basicInfo: BasicInfo = {
            db: db,
            client: client,

            stats: db.collection(Collections.Stats),
            registers: db.collection(Collections.Registers)
        }

        const result = await method.run(basicInfo, ...info.params);

        logResponse(req.ip, method.name, info.params, "", JSON.stringify(result));

        return sendAPIResponse(res, ResponseType.Success, result);
    } catch (err: any) {
        const error = err.message ?? err.code ?? err;
        const errorMessage = typeof error === "object" ? JSON.stringify(error) : error;
        const fullError = typeof err === "object" ? JSON.stringify(err) : err;

        logResponse(req.ip, method.name, info.params, "Internal Error".bgRed, errorMessage.red);
        if (errorMessage !== fullError) console.error(`${"FULL ERROR".bgRed} ${err}`);

        return sendAPIResponse(res, ResponseType.Error, errorMessage);
    }
}