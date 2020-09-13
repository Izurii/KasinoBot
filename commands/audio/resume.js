const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.resume = resume;

/**
 * @description Function that resumes the video stream on discord guild
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { boolean } userRequest - Param that indicates if command got a call from a user
 */
async function resume(message, userRequest=true) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(
		serverQueue.connection!==undefined &&
		serverQueue.connection.dispatcher.paused
	) {
		if(userRequest)
			message.channel.send("O p41 t4 0n d35gr4ç4");
		serverQueue.connection.dispatcher.resume();
	}
}