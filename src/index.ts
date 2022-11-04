import * as dotenv from "dotenv";
dotenv.config();

import openServer from "./openServer";

openServer(Number(process.env.PORT));