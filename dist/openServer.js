"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
require("colors");
const log_1 = require("./log");
const apiRequest_1 = require("./apiRequest");
async function openServer(port) {
    const connection = await dbConnect();
    const app = (0, express_1.default)().use(express_1.default.json());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://www.haxball.com');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Body');
        next();
    });
    app.post("/db", async (req, res) => {
        (0, log_1.logRequest)(req.ip, JSON.stringify(req.body));
        return await (0, apiRequest_1.apiRequest)(connection.client, connection.db, req, res, req.body);
    });
    app.listen(port, 'localhost', () => {
        console.log(`Listening database requests at http://localhost:${port}/db\n`.bold);
    });
    return app;
}
exports.default = openServer;
async function dbConnect() {
    const client = new mongodb_1.MongoClient(process.env.DB_URI, 
    // @ts-ignore
    { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return { client: client, db: client.db(process.env.DB_NAME) };
}
