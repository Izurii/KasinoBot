const Controller = require('./audioController');
const cyber_music = { title: 'サイバーパンク 2.0.7.7', url: 'https://www.youtube.com/watch?v=RrkqiYZbuH8' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.cyberpunk_music = cyberpunk_music;

/**
 * @description サイバーパンク 2.0.7.7!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function cyberpunk_music (message) {
	Controller.stopAllPlayUnique(message, cyber_music);
}