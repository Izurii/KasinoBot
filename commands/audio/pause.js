const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.pause = pause;

/**
 * @description Function that pauses the video strem on discord guild
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { boolean } userRequest - Param that indicates if command got a call from a user
 */
async function pause(message, userRequest=true) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(
		serverQueue.connection!==undefined &&
		!serverQueue.connection.dispatcher.paused
	) {
		serverQueue.connection.dispatcher.pause();
		if(userRequest)
			message.channel.send("Tá pauzado gay.");
	}
}