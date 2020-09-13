const JSDocTypes = require('../JSDocTypes');
const DiscordChannelType = JSDocTypes.DiscordChannelType;
const xml2js = require('xml2js');

/**
 * @description Function that returns a random int given the minimum and maximum passed to the function
 * @param  { Number } min - Minimum value
 * @param  { Number } max - Maximum value
 * @returns Returns a random integer number given the min~max parameters
 */
exports.randomInt = async (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}

/**
 * @description Function that return the average of number on a determined array
 * @param  { Array } array - Array that contains the numbers to be averaged off
 * @returns Return the average number between numbers on the array
 */
exports.average = async (array) => {
	return (array.reduce(function (a, b){ return a+b;}))/array.length;
}

/**
 * @description Function that format a given string to a max of characters passed on the function's parameter, if text exceed the limit he writes tree dots
 * @param  { string } text - Text that is to be formatted
 * @param  { Number } length=1024 - Define de max characters of the function's return
 * @returns Return the formatted text wihtin the character limit defined by length parameter 
 */
exports.formatTextLimitCharacters = async (text, length=1024) => {
	if (text == null) {
		return text;
	}
	if (text.length <= length) {
		return text;
	}
	text = text.substring(0, length);
	last = text.lastIndexOf(" ");
	text = text.substring(0, last);
	return text + "...";
}

/**
 * @description Function that fetch n number of messages on a specific channel
 * @param { DiscordChannelType } channel - Discord channel object
 * @param { Number } n_messages - Number of messages to fetch
 * @param { string } [order=DESC] - Order that array is going to return (ASC||DESC)
 * @returns Returns an array that contains in the given order (ASC or DESC) the N number of messages.
 */
exports.fetchMessages = async (channel, n_messages, order = "DESC") => {
	let messages = await channel.messages.fetch({ limit: n_messages });
	if (order == "DESC")
		return Array.from(messages).reverse();
	else if (order == "ASC")
		return Array.from(messages);
}

/**
 * @description Function that deletes a message from a specific channel by her id
 * @param  { DiscordChannelType } channel - Discord channel object
 * @param  { Number } message_id - Message's ID
 */
exports.deleteMessage = async (channel, message_id) => {
	let message = await channel.messages.fetch(message_id);
	message.delete();
}

/**
 * @description Function that edits a message by their id
 * @param  { DiscordChannelType } channel - Discord channel object
 * @param  { Number } message_id - Message's ID
 * @param  { string } new_message - Message to be placed
 */
exports.editMessage = async (channel, message_id, new_message) => {
	let message = await channel.messages.fetch(message_id);
	message.edit(new_message);
}

/**
 * @description Function that returns a parsed xml string, promise based
 * @param { string } data 
 */
exports.readXmlString = async (data) => {
	var parser = new xml2js.Parser();
	return parser.parseStringPromise(data);
}