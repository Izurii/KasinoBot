const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.reverse = reverse;
/**
 * @description Function that returns a message that contains a mirrored version of what the user put as arguments on command call
 * @param { DiscordMessageType } message 
 */
async function reverse (message) {
	let string = message.content.substr(8);
	message.channel.send(string.split("").reverse().join(""));
}
