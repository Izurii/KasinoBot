const Controller = require('./audioController');
const boss_music = { title: 'BOSS BUCETA, SENTA QUE LÁ VEM PICA', url: 'https://www.youtube.com/watch?v=PBwMGiju0G4' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.boss = boss;

/**
 * @param  { DiscordMessageType } message
 */
async function boss (message) {
	Controller.stopAllPlayUnique(message, boss_music);
}