const Controller = require('./audioController');
const tsunami_music = { title: 'GELADEIRA TSUNAMI!', url: 'https://www.youtube.com/watch?v=UVph8lkwl1E' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.tsunami = tsunami;

/**
 * @description GELADEIRA TSUNAMI!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function tsunami (message) {
	Controller.stopAllPlayUnique(message, tsunami_music);
}