const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.dolar = dolar;

/**
 * @description Function that returns the actual value of USD to BRL
 * @param  { DiscordMessageType } message - Message that user sended to bot
 */
async function dolar (message) { 
	await Controller.axios.get('https://economia.awesomeapi.com.br/all/USD-BRL')
	.then (response => {
		let valor = parseFloat(response.data.USD.ask).toFixed(2).replace(".", ",");
		message.reply("``Dólar está: R$"+valor+'``');
	})
	.catch ( error => {
		console.log(error);
		message.reply("M3u l0rd d3u 4lg0 de err4d0 p41, v41 fic4r par4 ma15 tard3.");
	});
}
