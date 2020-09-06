const Controller = require('./audioController');
const urss_music = { title: 'MOTHERLAND!!!', url: 'https://www.youtube.com/watch?v=U06jlgpMtQs' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.urss = urss;

/**
 * @param  { DiscordMessageType } message
 */
async function urss (message) {
	Controller.stopAllPlayUnique(message, urss_music);
}