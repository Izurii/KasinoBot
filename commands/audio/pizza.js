const Controller = require('./audioController');
const pizza_music = { title: 'P1ZZ4!!!', url: 'https://www.youtube.com/watch?v=U-xsosv6uM0' };
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.pizza = pizza;

/**
 * @description P1ZZ4!!!!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function pizza (message) {
	Controller.stopAllPlayUnique(message, pizza_music);
}

