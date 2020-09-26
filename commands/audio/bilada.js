const Controller = require('./audioController');
const bilada_music = {
	title: 'BOM, PRO PESSOAL GAMER, FICA A LIÇÃO PARA CONSEGUIR '+
	'EDUCAR A MULHER PARA ELA PARAR DE ENCHER O SACO E TE DAR SOSSEGO E TRANQUILIDADE',
	url: 'https://www.youtube.com/watch?v=PvNwPuQybVQ'
};
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.bilada = bilada;

/**
 * @description BILADA!
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function bilada (message) {
	Controller.stopAllPlayUnique(message, bilada_music);
}