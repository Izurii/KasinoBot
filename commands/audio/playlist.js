const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.playlist = playlist;

/**
 * @description Function that search playlists on YouTube
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function playlist (message, serverPrefix) {

	let argument = message.content.slice(serverPrefix.length+9).trim();

	if(Controller.ytpl.validateID(argument)) {

		let modified_message = message;
		modified_message.content = serverPrefix+'play '+argument;

		Controller.execute(modified_message, serverPrefix);
		return;

	} else if (Controller.ytdl.validateID(argument)) {
		return message.reply("Verif1que3 se tue l1nk é de pl4yli5t mesmno manim");
	}

	//return message.channel.send("Pesquisa de playlist em manutenção");

	Controller.ytsr.getFilters(argument)
	.then(async (filters) => {

		filter = filters.get('Sort by').find(o => o.name === 'View count');
		filters2 = await Controller.ytsr.getFilters(argument, filter.ref);
		filter2 = filters2.get('Type').find(o => o.name === 'Playlist');
		
		var options = { nextpageRef: filter2.ref, safeSearch: false, limit: 5 };

		Controller.ytsr(argument, options)
		.then(async function(result) {

			let tracks = result.items;
			const embed = new Controller.Discord.MessageEmbed()
			.setColor('#ff2400')
			.setThumbnail('https://cdn.discordapp.com/attachments/715236372423639070/725129163609997312/nico.png')
			.setTitle('ESCOLHE A PL4Y DE HOJE PAI')
			.setDescription(tracks.map((t, i) => `**${i+1} -** [${t.title}](${t.link}) (${t.length})`).join("\n"))
			.setFooter('Tem 15 segundos pra escolher ou cancele '+serverPrefix+ 'cancel');
			message.channel.send(embed);
			
			const filter = m => (m.content >= 1 && m.content <= 5) || m.content == serverPrefix+'cancel';
			await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
			.then((collected) => {

				if(collected.first().content==serverPrefix+'cancel')
					return collected.first().reply("C4nc3la memo p41 :'(");

				let index = parseInt(collected.first().content, 10);
				let track = tracks[index-1];

				let serverQueue = Controller.serverQueue.get(message.guild.id);
				let modified_message = message;
				modified_message.content = serverPrefix+'play '+track.link;
				try {
						Controller.execute(modified_message, serverPrefix);
				} catch (error) {
					console.log(error);
					message.reply("D3uu p4u n4 m4qu1n4, p4u na maqu1na4! ADemir Z00m Z00m")
				}
			}).catch((err) => {
				message.channel.send("<:cry:751921538462253077> f01 compr4 c1g4rr0 3m p4i??~");
			});
		}).catch((err) => {
			console.log(err);
		});
	}).catch((err) => {
		console.log(err);
	});
}