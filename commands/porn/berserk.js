const Controller = require('./pornController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.berserk = berserk;

/**
 * @description Function that executes all NSFW commands (rule34, nhentai, chan and idol)
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function berserk(message, serverPrefix) {

	const split = message.content.split(" "); split.shift();
	const args = split.join("").trim();

	if(args.length > 1) 
		return message.reply("Você não pode d1git4r ma15 N4D4!")

	if(!message.channel.nsfw)
		return message.reply("Somente em canal NSFW carai");

	Controller.rule34(message);
	Controller.nhentai(message, serverPrefix);
	Controller.idol(message);
	Controller.chan(message);

}
