import "colors";

function getTimestamp() {
    const date = new Date().toLocaleTimeString("pt-BR");
    return (" " + date + " ").bgYellow;
}

export function logResponse(ip: string, methodName: string, params: any[], prefix: string, ...messages: string[]) {
    prefix = prefix != null && prefix !== "" ? prefix + " " : "";
    ip = ip === "127.0.0.1" ? "localhost" : ip;

    const message = `${getTimestamp()}${" RES ".bgBlue}${` ${ip}`.bgGreen} ${prefix} ${methodName.yellow} ${params.map((p: any) => JSON.stringify(p)).join(" ").magenta} ${messages.join(" ")}`;
    
    console.log(message);
}

export function logRequest(ip: string, message: string) {
    ip = ip === "127.0.0.1" ? "localhost" : ip;

    const msg = `${getTimestamp()}${" REQ ".bgBlue}${` ${ip}`.bgGreen} ${message.white}`;
    
    console.log(msg);
}

export function logCache(prefix: string, key: string, value: string) {
    const msg = `${getTimestamp()}${" CACHE ".bgCyan}${prefix} ${key.white} -> ${value.grey}`;
    
    console.log(msg);
}