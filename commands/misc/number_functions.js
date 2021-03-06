const Controller = require('./miscController');
const audioController = require('../audio/audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.number_functions = number_functions;

/**
 * @description Function that handle commands that start off with numbers
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function number_functions (message, serverPrefix) {

	let command = message.content.substring(message.content.search(/[a-z]/));
	let number = message.content.substring(1, message.content.search(/[a-z]/));
	let convertMoneyRegex = new RegExp(`(\\${serverPrefix}([\\d]{1}?[\\d]*c))`);

	if(command.startsWith('d'))
		Controller.roll_number(message, serverPrefix, number);
	if(command==serverPrefix+'2077')
		audioController.cyberpunk_music(message);
	if(message.content.replace(/ /g,'').match(convertMoneyRegex))
		Controller.convertMoney(message, serverPrefix);

}