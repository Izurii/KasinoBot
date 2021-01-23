const Controller = require('./audioController');
const wiisports_music = { title: 'Wii!!!', url: 'https://www.youtube.com/watch?v=d5c4KOopwLs' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.wiisports = wiisports;

/**
 * @description Wii!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function wiisports (message) {
	Controller.stopAllPlayUnique(message, wiisports_music);
}