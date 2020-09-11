const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.repeat = repeat;

/**
 * @description Function that repeats the last video played on discord guild
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function repeat(message, serverPrefix) {
	const modified_message = message;
	modified_message.content = serverPrefix+'play '+Controller.last_play[message.guild.id];
	Controller.execute(modified_message, serverPrefix);
}