const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.pause = pause;

/**
 * @param  { DiscordMessageType } message
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