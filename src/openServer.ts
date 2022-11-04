import { MongoClient } from "mongodb";
import express from 'express';

import "colors";

import { logRequest } from "./log";
import { apiRequest } from "./apiRequest";

export default async function openServer(port: number) {
    const connection = await dbConnect();
    const app = express().use(express.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://www.haxball.com');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Body');
        
        next();
    })

    app.post("/db", async (req, res) => {
        logRequest(req.ip, JSON.stringify(req.body));
        return await apiRequest(connection.client, connection.db, req, res, req.body);
    }); 

    app.listen(port, 'localhost', () => {
        console.log(`Listening database requests at http://localhost:${port}/db\n`.bold);
    });

    return app;
}

async function dbConnect() {
    const client = new MongoClient(
        process.env.DB_URI as string,
        // @ts-ignore
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    await client.connect();

    return { client: client, db: client.db(process.env.DB_NAME) };
}