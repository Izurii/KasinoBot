const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.volume = volume;
/**
 * @description Function that changes the stream volume
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function volume (message) {
	
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	let volume = message.content.split(" ");
	volume = volume[1];

	if(!volume.match('[0-9]')||volume > 5||volume==0)
		return message.reply("Verifique se você digitou certo o volume cacete de cacuete. Pode ser de 1 a 10.");
	try {
		serverQueue.connection.dispatcher.setVolume(volume);
	} catch (error) {
		console.log(error);
		message.reply("HUSAMFW JPO ERRO CARLHO, chaM3 o ADM");
	}
}