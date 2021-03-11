const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.dolar = dolar;

/**
 * @description Function that returns the actual value of USD to BRL
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function dolar (message) { 
	let moeda = await Controller.utilFunctions.getValueCurrency('USD', 'BRL');
	
	if(!moeda)
		return message.reply("M3u l0rd d3u 4lg0 de err4d0 p41, v41 fic4r par4 ma15 tard3.");
	
	let valor = moeda.replace(".", ",");
	message.reply("``Dólar está: R$"+valor+'``');
}
