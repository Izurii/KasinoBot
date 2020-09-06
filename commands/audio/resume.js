const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.resume = resume;

/**
 * @description Function that resumes the video stream on discord guild
 * @param  { DiscordMessageType } message - Message that user sended to bot
 */
async function resume(message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(
		serverQueue.connection!==undefined &&
		serverQueue.connection.dispatcher.paused
	) {
		message.channel.send("O p41 t4 0n d35gr4ç4");
		serverQueue.connection.dispatcher.resume();
	}
}