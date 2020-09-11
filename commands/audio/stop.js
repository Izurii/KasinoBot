const Controller = require('./audioController');
const JSDocTypes = Controller.JSDocTypes;
const DiscordMessageType = JSDocTypes.DiscordMessageType;
exports.stop = stop;

/**
 * @description Function that stops video stream and clear the queue on the discord guild
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function stop(message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if (serverQueue == undefined || serverQueue.songs == undefined)
		return;
	serverQueue.songs.length = 0;
	serverQueue.connection.dispatcher.end();
}