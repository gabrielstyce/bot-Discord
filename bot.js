const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const jimp = require ('jimp');

client.on("ready", () => {
    console.log(`O bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setActivity(`Eu estou em ${client.guilds.size} servidores`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildMemberAdd", async member => {

    let canal = client.channels.get("511332130870001666");
    let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read('./image/mascara.png');
    let background = await jimp.read('./image/fundo.png');
    
    jimp.read(member.user.displayAvatarURL).then(avatar => {
        avatar.resize(130, 130);
        mask.resize(130,130);
        avatar.mask(mask);
        background.print(fonte, 170, 175, member.user.username);
        background.composite(avatar, 40, 90).write('bemvindo.png');
        canal.send(``, { files: ["bemvindo.png"]});

        Console.log('Imagem enviada!')
    })
    .catch(err => {
        console.log('Erro ao carregar a imagem')
    });
});

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latencia é ${m.createdTimestamp - message.createdTimestamp}ms. A latencia da API é ${Math.round(client.ping)}ms`);
    }

});

client.login(config.token);