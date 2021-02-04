const Controller = require('./audioController');
const oxii_music = { title: 'm0nG01', url: 'https://www.youtube.com/watch?v=ysmobwk7FTE&ab_channel=IzuriiHootoh' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.oxii = oxii;

/**
 * @description Oooxxiii!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function oxii (message) {
	Controller.stopAllPlayUnique(message, oxii_music);
}