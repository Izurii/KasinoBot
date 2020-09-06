const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.repeat = repeat;

/**
 * @description Function that repeats the last video played
 * @param { DiscordMessageType } message
 * @param { string } serverPrefix
 */
async function repeat(message, serverPrefix) {
	const modified_message = message;
	modified_message.content = serverPrefix+'play '+Controller.last_play[message.guild.id];
	Controller.execute(modified_message, serverPrefix);
}