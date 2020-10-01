const Controller = require('./pornController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.nhentai = nhentai;
/**
 * @description Function that search/list/random a doujinshi from NHentai
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function nhentai (message, serverPrefix) {

	const split = message.content.split(" "); split.shift();
	const args = split.join(" ").trim();
	let doujin = [];
	let searchState = false;
	console.log(args);
	if(args.length > 1) {
		if(args.match('[0-9]+')) {
			if(!Controller.nHentai.exists(args))
				return message.channel.send("We3ab0o escr0t0, 3ss4 parad4 n4o exi1ste não.");
			doujin = await Controller.nHentai.getDoujin(args);
		} else {
			searchState = true;
			await Controller.nHentai.search(args, 1, 'popular').then((result) => {
				sendEmbedChooseDoujin(message, result.results, serverPrefix);
			});
		}
	} else  {
		doujin = await getRandomDoujin();
	}

	if(!searchState)
		sendDoujinEmbedMessage(message, doujin);

}

/**
 * @description Return an object that contains a random doujin from nHentai
 */
async function getRandomDoujin () {
	return await Controller.axios('https://nhentai.net/random/')
	.then(async (response) => {
		let randomDoujinUrl = response.request.res.responseUrl;
		let doujinObject = await Controller.nHentai.getDoujin(randomDoujinUrl);
		return doujinObject;
	})
	.catch(rej => {
		message.channel.send("tU d3rrub0u o 5erv1d0r c4c3t3");
	});
}

/**
 * @description Function that prepare an embed message with description, title, links etc from a doujin and send it
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param  { object } doujin - Doujin object that contains all sort of informations
 * @param  { object } doujin.pages - All doujin pages url
 * @param  { string } doujin.link - Doujin URL
 * @param  { object } doujin.details - Contains details
 * @param  { object } doujin.details.tags - Contains all doujin tags
 * @param  { object } doujin.details.artists - Artists
 * @param  { object } doujin.details.pages - Number of pages
 */
async function sendDoujinEmbedMessage (message, doujin) {

	let tagsEmbedField = '';
	let tags = await prepareTagsAuthorsForEmbed(doujin.details.tags);
	tags.forEach(tag => {
		tagsEmbedField += '``'+tag+'`` ';
	});

	let artistsEmbedField = '';
	let artists = await prepareTagsAuthorsForEmbed(doujin.details.artists);
	artists.forEach(artist => {
		artistsEmbedField += '``'+artist+'`` ';
	});

	let inlineArtistsState = true;
	if(artists.length > 5)
		inlineArtistsState = false;

	let embedFields = [
		{'name':'Pages', value:doujin.details.pages, 'inline':true},
		{'name': 'Artista(s)', value:artistsEmbedField, 'inline':inlineArtistsState},
		{'name':'Tags','value':tagsEmbedField}
	];

	var attachment = new Controller.Discord.MessageAttachment("./images/bot/logo.png", "logo.png");
	var doujinMessage = new Controller.Discord.MessageEmbed()
		.setColor('#ff2400')
		.attachFiles(attachment)
		.setThumbnail('attachment://logo.png')
		.setImage(doujin.pages[0])
		.addFields(embedFields)
		.setTitle(doujin.title)
		.setURL(doujin.link)
		.setAuthor('KasinoBot na busca pelos qu3nt40')
		.setFooter('O link é o título do doujin, d1virt4-s3.');

	message.channel.send(doujinMessage);
	
}

/**
 * @description Function that get the first 5 doujins from the list and send an embed message to user choose one of them
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param  { object } doujins - Object that carries a list of doujins returned from search
 * @param { string } serverPrefix - Server bot prefix
 */
async function sendEmbedChooseDoujin (message, doujins, serverPrefix) {

	const embed = new Controller.Discord.MessageEmbed()
	.setColor('#ff2400')
	.setThumbnail('https://cdn.discordapp.com/attachments/648016758346612759/761307301243650079/dddqxj0-12dc5989-6e8e-4a0f-bf9f-887a5db96b18.png')
	.setTitle('ESCOLHE O QU3NT40 AÍ 変態')
	.setDescription(doujins.slice(0, 5).map((t, i) => `**${i+1} -** [${t.title}](https://nhentai.net/g/${t.bookId}) (${t.bookId})`).join("\n"))
	.setFooter('Tem 15 segundos pra escolher ou cancele '+serverPrefix+ 'cancel');
	message.channel.send(embed);
	
	const filter = m => (m.content >= 1 && m.content <= 5) || m.content == serverPrefix+'cancel';
	await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
	.then(async (collected) => {

		if(collected.first().content==serverPrefix+'cancel')
			return collected.first().reply("V3m d4 uma suga4da na m1nh4 R0LA!");

		let index = parseInt(collected.first().content, 10);
		let doujinId = doujins[index-1].bookId;

		let doujin = [];
		doujin = await Controller.nHentai.getDoujin(doujinId);

		sendDoujinEmbedMessage(message, doujin);

	}).catch((err) => {
		message.channel.send("<:cry:751921538462253077> 4band0n4 m3sm0 vai, ばか~");
	});
}

/**
 * @description Function that format the doujin tags
 * @param  { object } tags
 */
async function prepareTagsAuthorsForEmbed (tags) {
	let fTags = [];
	tags.forEach(tag => {
		let tagReverse = tag.split("").reverse().join("");
		let tagSplit = tagReverse.split(" ");
		fTags.push(tagSplit[1].split("").reverse().join(""));
	});
	return fTags;
}