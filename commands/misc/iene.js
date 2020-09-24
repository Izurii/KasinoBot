const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.iene = iene;

/**
 * @description Function that returns the actual value of JPY to BRL
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function iene (message) { 
	await Controller.axios.get('https://economia.awesomeapi.com.br/all/JPY-BRL')
	.then (response => {
		let valor = parseFloat(response.data.JPY.ask).toFixed(5).replace(".", ",");
		message.reply("``Iene está: R$"+valor+'``');
	})
	.catch ( error => {
		console.log(error);
		message.reply("M3u l0rd d3u 4lg0 de err4d0 p41, v41 fic4r par4 ma15 tard3.");
	});
}
