import { BasicInfo, DBMethod } from "../global";

export default class RegisterPlayer implements DBMethod {
    public name = "registerPlayer";
    public schema = {
        properties: {
            name: { type: "string" },
            discordID: { type: "string" },
            password: { type: "string" }
        },
        required: ["name", "discordID", "password"]
    }
    
    async run($: BasicInfo, name: string, discordID: string, password: string) {
        if ((name + "").trim() !== name) throw "Seu nome de usuário não pode conter espaços no início ou final do nome";
        if (name.length > 25) throw "Seu nome de usuário deve ter no máximo 25 caracteres";
        if (name.length < 1) throw "Seu nome de usuário não pode ficar vazio";

        const accountWithSameDiscord = await $.registers.findOne({ $or: [ { discord: discordID } ] });
        const accountWithSameName = !!(await $.registers.findOne({ $or: [ { name: name } ] }));

        if (!!accountWithSameDiscord) throw `Você já está registrado (\`${accountWithSameDiscord.name}\`).`;
        if (!!accountWithSameName) throw `Já existe uma conta com esse nome!`;

        $.registers.insertOne({
            createdAt: Date.now(),
            name,
            discord: discordID,
            password
        });
    }
}