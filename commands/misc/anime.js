const Controller = require('./miscController');

//MAL Api Auth
const Jikan = require('jikan-node');
const mal = new Jikan();

const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.anime = anime;

/**
 * @description Function that returns a random anime from MAL using Jikan API
 * @param  { DiscordMessageType } message - Message that user sent to bot
 */
async function anime (message) {

	let process_message = await message.channel.send("Pr0c3554nd0...");
	let random_index = await Controller.utilFunctions.randomInt(0, 40257);
	var tempts = 0;

	async function get_random_anime (index) {
		if(tempts>10)
			return false;

		let anime_info = mal.findAnime(index)
		.then(res => {
			return res;
		})
		.catch(rej => {
			return false;
		});

		if(!anime_info) {
			tempts += 1;
			let random_again = await Controller.utilFunctions.randomInt(0, 40257);
			return await get_random_anime(random_again);
		} else {
			return anime_info;
		}
	}

	let anime_info = await get_random_anime(random_index);
	if(!anime_info) {
		process_message.edit("T3nt4m05 mu1t4s v3z3s e n40 d3u p4rç4");
		return;
	}

	//Anime section
	let anime_id = anime_info.mal_id;
	let anime_title = anime_info.title;
	let anime_ep_count = anime_info.episodes;
	let anime_type = anime_info.type;
	let anime_rank = anime_info.rank;
	let anime_synopsis = await Controller.utilFunctions.formatTextLimitCharacters(anime_info.synopsis);
	let anime_popularity = anime_info.popularity;
	
	//Animes urls
	let mal_link = anime_info.url;
	let image_url = anime_info.image_url;

	//Checks for null values
	if(anime_rank==null)
		anime_rank = "N/A";
	if(anime_synopsis==null)
		anime_synopsis = "N/A";

	var options_embed = new Controller.Discord.MessageEmbed()
					.setColor('#ff2400')
					.setThumbnail(image_url)
					.setURL(mal_link);

	options_embed.addField(
		anime_title,
		'``Type: '+anime_type+'`` ``Episodes: '+anime_ep_count+'`` ``Rank: '+anime_rank+'`` '+
		'``Popularity: '+anime_popularity+'``'+
		'\n\nSinopse: '+anime_synopsis);

	process_message.delete();
	message.channel.send(options_embed);

}