const Controller = require('./audioController');
const mongol_music = { title: 'm0nG01', url: 'https://www.youtube.com/watch?v=ysmobwk7FTE&ab_channel=IzuriiHootoh' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.mongol = mongol;

/**
 * @description Mongol!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function mongol (message) {
	Controller.stopAllPlayUnique(message, mongol_music);
}