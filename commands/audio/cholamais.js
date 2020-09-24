const Controller = require('./audioController');
const chola_music = { title: 'CHOLA MEMO V14D0!!!', url: 'https://www.youtube.com/watch?v=peA6xbaBMBk' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.cholamais = cholamais;

/**
 * @description CHOLA MAIS CORNO!!!!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function cholamais (message) {
	Controller.stopAllPlayUnique(message, chola_music);
}