const Controller = require('./utilityController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
const Bot = require('../../');
exports.adm_message = adm_message;

/**
 * @description Function that sends a specific message to all guilds connected, only works with Izurii_Hootoh
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function adm_message (message) { 
	
	const izht_id = '229096474762280960';

	if(message.author.id!==izht_id)
		return;

	let messageToSend = message.content.substr(message.content.indexOf(' ')+1);
	let guilds = await Bot.getAllGuilds();

	guilds.forEach(server => {
		
		if(server.id=="535935100123086858")
			continue;
		
		let systemChannel = server.systemChannel;
		systemChannel.send(messageToSend);
	});

}