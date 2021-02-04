const Controller = require('./audioController');
const oxii_music = { title: 'Oooxxiii!', url: 'https://www.youtube.com/watch?v=_fX4_EIDU-M' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.oxii = oxii;

/**
 * @description Oooxxiii!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function oxii (message) {
	Controller.stopAllPlayUnique(message, oxii_music);
}