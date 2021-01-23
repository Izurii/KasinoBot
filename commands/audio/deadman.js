const Controller = require('./audioController');
const deadman_music = { title: '0M4E WA M0U SH1NDEIRU!', url: 'https://www.youtube.com/watch?v=9n-yiNx8sbY' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.deadman = deadman;

/**
 * @description deadman - omae wa mou shindeiru!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function deadman (message) {
	Controller.stopAllPlayUnique(message, deadman_music);
}