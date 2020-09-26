const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.volume = volume;
/**
 * @description Function that changes the stream volume
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function volume (message) {
	
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	const split = message.content.split(" "); split.shift();
	const volume = parseFloat(split.join("").trim());

	if(isNaN(volume)||volume > 5||volume==0)
		return message.reply("Verifique se você digitou certo o volume cacete de cacuete. Pode ser de 1 a 5.");
	try {
		if(
			serverQueue==undefined||
			serverQueue.connection==undefined||
			serverQueue.connection.dispatcher==undefined
		)
			return message.reply("Não t4 t0cand0 n4d4 irmã0 s3m mud4nç4s.");
		serverQueue.connection.dispatcher.setVolume(volume);
	} catch (error) {
		console.log(error);
		message.reply("HUSAMFW JPO ERRO CARLHO, chaM3 o ADM");
	}
}