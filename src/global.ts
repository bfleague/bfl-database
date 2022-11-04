import type { Collection, Db, MongoClient } from "mongodb";

export interface DBMethod {
    name: string,
    schema: Object,
    run: Function
}

export enum Collections {
    Registers = "registers",
    Stats  = "stats"
}

export type BasicInfo = { 
    db: Db,
    client: MongoClient,
    stats: Collection,
    registers: Collection
}

export enum ResponseType {
    InternalError = "internal_error",
    Error = "error",
    Success = "success"
}