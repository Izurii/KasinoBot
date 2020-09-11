const Controller = require('./audioController');
const JSDocTypes = Controller.JSDocTypes;
const DiscordMessageType = JSDocTypes.DiscordMessageType;
exports.skip = skip;

/**
 * @description Function that skips a song if the guild has more than one song on queue.
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function skip(message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if (!serverQueue || (serverQueue.songs.length == 1)) {
		return message.channel.send("EU NÃO PULO CORDA NÃO!");
	} else if (serverQueue.songs.length > 1 && serverQueue.songs[0].loop) {
		serverQueue.loop = false;
	}
	serverQueue.connection.dispatcher.end();
}