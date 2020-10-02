const Controller = require('./audioController');
const felipao_song = { path: '../../audios/felipao.mp3', message: 'FELIPAOO!' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.felipao = felipao;

/**
 * @description FELIPAOO!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function felipao (message) {
	Controller.stopAllPlayMP3(message, felipao_song);
}