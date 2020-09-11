const Controller = require('./audioController');
const urss_music = { title: 'MOTHERLAND!!!', url: 'https://www.youtube.com/watch?v=U06jlgpMtQs' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.urss = urss;

/**
 * @description Well, MOTHERLAND!!!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function urss (message) {
	Controller.stopAllPlayUnique(message, urss_music);
}