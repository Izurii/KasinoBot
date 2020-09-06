const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.pause = pause;

/**
 * @description Function that pauses the video strem on discord guild
 * @param  { DiscordMessageType } message - Message that user sended to bot
 */
async function pause(message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(
		serverQueue.connection!==undefined &&
		!serverQueue.connection.dispatcher.paused
	) {
		serverQueue.connection.dispatcher.pause();
		message.channel.send("Tá pauzado gay.");
	}
}