"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = void 0;
const global_1 = require("./global");
const jsonschema_1 = require("jsonschema");
const log_1 = require("./log");
require("colors");
const RegisterPlayer_1 = __importDefault(require("./methods/RegisterPlayer"));
const GetPlayer_1 = __importDefault(require("./methods/GetPlayer"));
const UpdatePlayerAuth_1 = __importDefault(require("./methods/UpdatePlayerAuth"));
const ChangePassword_1 = __importDefault(require("./methods/ChangePassword"));
const ChangeUsername_1 = __importDefault(require("./methods/ChangeUsername"));
const UpdateStats_1 = __importDefault(require("./methods/UpdateStats"));
const GetPlayerStats_1 = __importDefault(require("./methods/GetPlayerStats"));
const GetStatRank_1 = __importDefault(require("./methods/GetStatRank"));
const FindPlayer_1 = __importDefault(require("./methods/FindPlayer"));
const FindPlayerStats_1 = __importDefault(require("./methods/FindPlayerStats"));
const GetDatabaseInfo_1 = __importDefault(require("./methods/GetDatabaseInfo"));
const Ping_1 = __importDefault(require("./methods/Ping"));
const methodList = [
    RegisterPlayer_1.default,
    GetPlayer_1.default,
    UpdatePlayerAuth_1.default,
    ChangePassword_1.default,
    ChangeUsername_1.default,
    UpdateStats_1.default,
    GetPlayerStats_1.default,
    GetStatRank_1.default,
    FindPlayer_1.default,
    FindPlayerStats_1.default,
    GetDatabaseInfo_1.default,
    Ping_1.default
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
    };
}
function sendAPIResponse(res, type, message) {
    return res.status(200).json({ type, message });
}
async function apiRequest(client, db, req, res, info) {
    var _a, _b;
    if (info.method == null)
        return sendAPIResponse(res, global_1.ResponseType.InternalError, "Method not specified");
    if (info.params == null)
        return sendAPIResponse(res, global_1.ResponseType.InternalError, "Parameters not specified");
    if (typeof info.method !== "string")
        return sendAPIResponse(res, global_1.ResponseType.InternalError, "Method must be string");
    if (!Array.isArray(info.params))
        return sendAPIResponse(res, global_1.ResponseType.InternalError, "Invalid params");
    const method = methodList.find(m => m.name === info.method);
    if (method == null)
        return sendAPIResponse(res, global_1.ResponseType.InternalError, "Method not found");
    let schema = getSchema();
    schema.properties.params.items = method.schema;
    let validation = (0, jsonschema_1.validate)(info.params, schema, { allowUnknownAttributes: false });
    if (!validation.valid) {
        console.log(JSON.stringify(validation.errors));
        return sendAPIResponse(res, global_1.ResponseType.InternalError, `Invalid schema`);
    }
    try {
        const basicInfo = {
            db: db,
            client: client,
            stats: db.collection(global_1.Collections.Stats),
            registers: db.collection(global_1.Collections.Registers)
        };
        const result = await method.run(basicInfo, ...info.params);
        (0, log_1.logResponse)(req.ip, method.name, info.params, "", JSON.stringify(result));
        return sendAPIResponse(res, global_1.ResponseType.Success, result);
    }
    catch (err) {
        const error = (_b = (_a = err.message) !== null && _a !== void 0 ? _a : err.code) !== null && _b !== void 0 ? _b : err;
        const errorMessage = typeof error === "object" ? JSON.stringify(error) : error;
        const fullError = typeof err === "object" ? JSON.stringify(err) : err;
        (0, log_1.logResponse)(req.ip, method.name, info.params, "Internal Error".bgRed, errorMessage.red);
        if (errorMessage !== fullError)
            console.error(`${"FULL ERROR".bgRed} ${err}`);
        return sendAPIResponse(res, global_1.ResponseType.Error, errorMessage);
    }
}
exports.apiRequest = apiRequest;
