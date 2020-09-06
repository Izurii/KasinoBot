const Controller = require('./audioController');
const JSDocTypes = Controller.JSDocTypes;
const DiscordMessageType = JSDocTypes.DiscordMessageType;
exports.stop = stop;

/**
 * @param  { DiscordMessageType } message
 */
async function stop(message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if (serverQueue == undefined || serverQueue.songs == undefined)
		return;
	serverQueue.songs.length = 0;
	serverQueue.connection.dispatcher.end();
}