const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.number_functions = number_functions;

/**
 * @description Function that handle commands that start off with numbers
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function number_functions (message) {

	let command = message.content.substring(message.content.search(/[a-z]/));
	let number = message.content.substring(1, message.content.search(/[a-z]/));

	if(command.startsWith('d'))
		Controller.roll_number(message, number);

}