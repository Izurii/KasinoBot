const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
const shuffleArray = require('shuffle-array');
exports.shuffle = shuffle;

/**
 * @description Function that shuffles the current queue of songs on guild
 * @param { DiscordMessageType } message
 */
async function shuffle (message) {
	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(!serverQueue||serverQueue.songs.length<1)
		return message.channel.send("N40 t3m n4d4 pr4 m3x3r aqui");
	try{
		shuffleArray(serverQueue.songs);
		message.channel.send("T4 m1xtur4d0!");
	} catch (e) {
		message.channel.send("Ixii deu ruim mano, contato o GM");
	}
}