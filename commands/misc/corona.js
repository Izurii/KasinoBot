const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.corona = corona;
/**
 * @description Function that process the call of 'corona' command, if has any arguments he tries to get the country's data, if not he shows a list of countries.
 * @param  { DiscordMessageType } message - Message that user sended to bot
 */
async function corona (message) {

	let args = message.content.split(" ");	

	if(args.length > 1)
		get_data_country(message);
	else
		get_countries(message);

}

/**
 * @description Function that return a pagination embed like message with all possible countries to use with 'corona' command
 * @param { DiscordMessageType } message 
 */
async function get_countries (message) {
	
	var options = {
		headers: {
		  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
		  'x-rapidapi-key': 'dec675cfe8msh7e8a5dc7fe6b8e9p1f31bejsn58cd2a236591',
		  useQueryString: true
		}
	};
	
	let countries = await Controller.axios.get('https://covid-19-data.p.rapidapi.com/help/countries', options)
	.then(response => {
		return response.data;
	})
	.catch ( error => {
		console.log(error);
		message.reply("M3u l0rd d3u 4lg0 de err4d0 p41, v41 fic4r par4 ma15 tard3.");
	});

	if (countries == undefined)
		return;

	let countries_embed = [];
	countries.forEach((item) => {

		if(item['alpha3code']==null)
			item['alpha3code'] == "Não tem.";

		countries_embed.push({ name: item['name'] + ' (Código: **'+ item['alpha3code'] + '**)'})
	});

	const FieldsEmbed = new Controller.DiscordEmbedPagination.FieldsEmbed()
	.setArray(countries_embed)
	.setChannel(message.channel)
	.setElementsPerPage(15)
	.setPage(1)
	.setTimeout(300000)
	.setPageIndicator(true)
	.formatField('**Lista de países para puxar os dados (use o código do país quando for usar o comando ``corona``**', i => i.name)

	FieldsEmbed.embed
	.setColor('#ff2400')
	FieldsEmbed.build();

}

/**
 * @description Function that gets country data for corona disease and send a message to discord with that.
 * @param { DiscordMessageType } message 
 */
async function get_data_country(message) {

	let args = message.content.split(" ");
	
	var options = {
		params: {code: args[1]},
		headers: {
		'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
		'x-rapidapi-key': 'dec675cfe8msh7e8a5dc7fe6b8e9p1f31bejsn58cd2a236591',
		useQueryString: true
		}
	};
	
	let country_data = await Controller.axios.get('https://covid-19-data.p.rapidapi.com/country/code', options)
	.then(response => {
		return response.data[0];
	})
	.catch(error => {
		console.log(error);
	});

	if (country_data == undefined)
		return message.channel.send("Verifique se você não digitou errado o código do país, caso esteja correto contate o ADEMIR.");

	let confirmed_cases = country_data.confirmed;
	let deaths = country_data.deaths;
	let recovered_cases = country_data.recovered;
	let country_name = country_data.country;

	var options_embed = new Controller.Discord.MessageEmbed()
					.setColor('#ff2400')
					.setThumbnail('https://i.ytimg.com/vi/Zp0ZvTPtzbA/maxresdefault.jpg')
					.setTitle('Dados em relação ao estado do COVID-19 do país '+country_name)
					.setAuthor('Coringão p4s50u por 4qu1')
					.setFooter('Idaí, não sou c0v3ir0 t4okey?');

	let embed_fields = [
		{ name: 'Casos confirmados:', value: confirmed_cases},
		{ name: 'Mortos Atualmente:', value: deaths},
		{ name: 'Recuperados:', value: recovered_cases},
	];

	options_embed.addFields(embed_fields);
	message.channel.send(options_embed);

}