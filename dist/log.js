"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logCache = exports.logRequest = exports.logResponse = void 0;
require("colors");
function getTimestamp() {
    const date = new Date().toLocaleTimeString("pt-BR");
    return (" " + date + " ").bgYellow;
}
function logResponse(ip, methodName, params, prefix, ...messages) {
    prefix = prefix != null && prefix !== "" ? prefix + " " : "";
    ip = ip === "127.0.0.1" ? "localhost" : ip;
    const message = `${getTimestamp()}${" RES ".bgBlue}${` ${ip}`.bgGreen} ${prefix} ${methodName.yellow} ${params.map((p) => JSON.stringify(p)).join(" ").magenta} ${messages.join(" ")}`;
    console.log(message);
}
exports.logResponse = logResponse;
function logRequest(ip, message) {
    ip = ip === "127.0.0.1" ? "localhost" : ip;
    const msg = `${getTimestamp()}${" REQ ".bgBlue}${` ${ip}`.bgGreen} ${message.white}`;
    console.log(msg);
}
exports.logRequest = logRequest;
function logCache(prefix, key, value) {
    const msg = `${getTimestamp()}${" CACHE ".bgCyan}${prefix} ${key.white} -> ${value.grey}`;
    console.log(msg);
}
exports.logCache = logCache;
