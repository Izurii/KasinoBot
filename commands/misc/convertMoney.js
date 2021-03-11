const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.convertMoney = convertMoney;

/**
 * @description Function that returns the value from a currency to another
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function convertMoney (message, serverPrefix) { 

	let listaMoedas = JSON.parse(Controller.fs.readFileSync('commands/misc/moedas.json'));

	sendTodasMoedas(message, serverPrefix, listaMoedas);

	var { moedaOrigem, moedaDestino } = await getMoedas(message, serverPrefix, listaMoedas);
	if(moedaOrigem==null||moedaDestino==null)
		return;

	const valor = message.content.substring(0 + serverPrefix.length, message.content.search(/[a-z]/));
	const valorDaMoeda = await Controller.axios.get(`https://api.currconv.com/api/v7/convert?q=${moedaOrigem}_${moedaDestino}&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`)
	.then (response => {
		return parseFloat(response.data[moedaOrigem+'_'+moedaDestino]).toFixed(3);
	})
	.catch ( error => {
		console.log(error);
		return false;
	});;
	
	var resultado = valor * valorDaMoeda;
	
	var formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: moedaDestino,
	  });

	var resultadoFormatado = formatter.format(resultado);

	message.reply(`Isso fica **${resultadoFormatado}**`);

}

/**
 * @typedef {Object} Moedas
 * @property  { string } moedaOrigem - From currency
 * @property  { string } moedaDestino - To current
 */

/**
 * @description Function that returns the selected currency
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 * @param { Object } listaMoedas - List of currencies
 * @returns { Moedas } Selected currency
 */
async function sendTodasMoedas (message, serverPrefix, listaMoedas) {
	
	let listaMoedasFields = [];

	listaMoedas.forEach((element, index) => {
		listaMoedasFields.push({ currency: ` ${index+1}  - **${element.id}** -> ${element.currencyName}`});
	});

	const FieldsEmbed = new Controller.DiscordEmbedPagination.FieldsEmbed()
	.setArray(listaMoedasFields.slice(0, Math.ceil(listaMoedasFields.length/2)))
	.setChannel(message.channel)
	.setElementsPerPage(17)
	.setPage(1)
	.setTimeout(300000)
	.setPageIndicator(true)
	.formatField('**Lista de moedas 1/2**', (i, idx) => listaMoedasFields[idx+((FieldsEmbed.page-1)*30)].currency, true)
	.formatField('**Lista de moedas 2/2**', (i, idx) =>{ 
		let moeda = listaMoedasFields[idx+15+((FieldsEmbed.page-1)*30)];
		if(moeda!==undefined)
			return moeda.currency;
		return { currency : '...'}
	}, true)

	FieldsEmbed.embed
	.setColor('#ff2400')
	.setTitle('')
	.setDescription('')
	.setThumbnail('https://cdn.discordapp.com/attachments/648016758346612759/818995625324052500/paulo-guedes-18.png')
	.setFooter('Tem 2 minutos pra escolher ou cancele '+serverPrefix+ 'cancel')

	FieldsEmbed.build();

}

/**
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 * @param { Object } listaMoedas - List of currencies
*/
async function getMoedas (message, serverPrefix, listaMoedas) {

	var moedaOrigem = null;
	var moedaDestino = null;

	const filter = m => (m.content >= 1 && m.content <= listaMoedas.length) || m.content == serverPrefix+'cancel';
	await message.channel.awaitMessages(filter, { max: 1, time: 70000, errors: ["time"] })
	.then((collected) => {

		if(collected.first().content==serverPrefix+'cancel')
			return collected.first().reply("C4nc3la memo p41 :'(");

		let index = parseInt(collected.first().content, 10);
		moedaOrigem = listaMoedas[index-1].id;
	
	}).catch((err) => {
		console.log(err);
		message.channel.send("<:cry:751921538462253077> 4band0n4 m3sm0 vai, pau pequeno~");
	});

	if(moedaOrigem==null) return;

	message.reply("Agora escolha a moeda de destino aí o paiaço, mais um minuto para escolher");

	await message.channel.awaitMessages(filter, { max: 1, time: 65000, errors: ["time"] })
	.then((collected) => {

		if(collected.first().content==serverPrefix+'cancel')
			return collected.first().reply("C4nc3la memo p41 :'(");

		let index = parseInt(collected.first().content, 10);
		moedaDestino = listaMoedas[index-1].id;
	
	}).catch((err) => {
		console.log(err);
		message.channel.send("<:cry:751921538462253077> 4band0n4 m3sm0 vai, pau pequeno~");
	});
	
	console.log(moedaOrigem);
	console.log(moedaDestino);

	return { moedaOrigem:moedaOrigem, moedaDestino:moedaDestino};

};