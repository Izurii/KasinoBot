const Controller = require('./audioController');
const kubo_song = { path: '../../audios/kubo.mp3', message: 'KUUBOOOOOOOOOOOO!!' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.kubo = kubo;

/**
 * @description KUUBOOOOOOOOOOOO!!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function kubo (message) {
	Controller.stopAllPlayMP3(message, kubo_song);
}