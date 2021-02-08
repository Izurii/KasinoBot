//Inicializando as variáveis de ambiente (use process.env.NOME_DA_VAR)
require('dotenv').config();

const Discord = require('discord.js');
const discordToken = process.env.DISCORD_TOKEN;
const client = new Discord.Client({ shardCount: 'auto' });
const utilFunctions = require('./utilFunctions');
const db = require('./database');
const { commandHandler } = require('./commands/commandHandler');

client.on('guildCreate', async guild => {
	
	let guildDB = await db.query(`SELECT * FROM KBGuild WHERE KBGGuildID = ${guild.id}`);
	if(guildDB==undefined) {
		await db.query(`INSERT INTO KBGuild (KBGGUildID, KBGName) VALUES (${guild.id}, '${guild.name}')`);
	} else {
		let guildName = guildDB.KBGName;
		if(guildName!=guild.name)
			await db.query(`UPDATE KBGuild SET KBGName = '${guild.name}' WHERE KBGGuildID = ${guild.id}`);
	}

})

client.on('ready', () => {
	console.log(`Ready!`);
	client.user.setActivity("com seu cú | -help");
});

client.on('message', async message => {

	if(message.author.bot) return;
	
	let xingamentos = [
		'VAI SE FUDE OTÁRIO',
		'VEM AQUI DÁ UMA SUGADA NA MINHA ROLA',
		'Tá mandando mensagem por que? Tá achando que aqui é Twitter?',
		'~Tua mãe tá solteira?',
	];
	let chanceXingamento = await utilFunctions.randomInt(1, 3000);
	if(chanceXingamento<=10)
		message.reply(xingamentos[await utilFunctions.randomInt(0, xingamentos.length)]);

	let prefix = await db.query("SELECT KBGPrefix FROM KBGuild WHERE KBGGuildID = "+message.guild.id);
	prefix = prefix.KBGPrefix;

	if(message.content.startsWith(prefix)) {
		commandHandler(message, prefix);
	}

});

client.on('voiceStateUpdate', async (oldState, newState) => {

	const audioController = require('./commands/audio/audioController');
	const serverQueue = audioController.serverQueue.get(oldState.guild.id);
	
	if(serverQueue==undefined)
		return;

	if(oldState.channelID!==newState.channelID)
		serverQueue.voiceChannel = newState.guild.channels.cache.get(newState.channelID);
	
	let message = [];
	message.guild = [];
	message.guild.id = newState.guild.id;
	
	if(!oldState.serverMute&&newState.serverMute) {
		serverQueue.textChannel.send("Mut0u porqu3 g4y? :s");
		audioController.pause(message, false);
	} else {
		audioController.resume(message, false);
	}

});

client.login(discordToken);

exports.getAllGuilds = getAllGuilds;
/**
 * @description Function that returns an array with all guilds connected
 * @returns Array containing all guilds
 */
async function getAllGuilds() {
	return client.guilds.cache;
}
