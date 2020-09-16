const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.playlist = playlist;

/**
 * @description Function that search playlists on YouTube
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function playlist (message, serverPrefix) {

	return message.channel.send("Manutenção por tempo indeterminado. Desculpe.");

	let argument = message.content.slice(serverPrefix.length+9);

	if(Controller.ytpl.validateURL(argument)) {

		let modified_message = message;
		modified_message.content = serverPrefix+'play '+argument;

		Controller.execute(modified_message, serverPrefix);
		return;

	} else if (Controller.ytdl.validateURL(argument)) {
		return message.reply("Verif1que3 se tue l1nk é de pl4yli5t mesmno manim");
	}

	Controller.ytsr.getFilters(argument, (err, filters) => {
		if(err) throw err;
		filter = filters.get('Type').find(o => o.name === 'Playlist');
		Controller.ytsr.getFilters(filter.ref, (err, filters) => { 

			if(err) throw err;
			var options = { limit: 5, nextpageRef: filter.ref, safeSearch: false };

			Controller.ytsr(null, options, async function(err, result) {

				let tracks = result.items;
				const embed = new Controller.Discord.MessageEmbed()
				.setColor('#ff2400')
				.setThumbnail('https://cdn.discordapp.com/attachments/715236372423639070/725129163609997312/nico.png')
				.setTitle('ESCOLHE A PL4Y DE HOJE PAI')
				.setDescription(tracks.map((t, i) => `**${i+1} -** [${t.title}](${t.link}) (${t.length})`).join("\n"))
				.setFooter('Tem 15 segundos pra escolher ou cancele '+serverPrefix+ 'cancel');
				message.channel.send(embed);
				
				const filter = m => (m.content >= 1 && m.content <= 5) || m.content == serverPrefix+'cancel';
				await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
				.then((collected) => {

					if(collected.first().content==serverPrefix+'cancel')
						return collected.first().reply("C4nc3la memo p41 :'(");
	
					let index = parseInt(collected.first().content, 10);
					let track = tracks[index-1];
	
					let serverQueue = Controller.serverQueue.get(message.guild.id);
					let modified_message = message;
					modified_message.content = serverPrefix+'play '+track.link;
					try {
						if(!serverQueue)
							Controller.execute(modified_message, serverPrefix);
					} catch (error) {
						console.log(error);
						message.reply("D3uu p4u n4 m4qu1n4, p4u na maqu1na4! ADemir Z00m Z00m")
					}
				});
			});
		});
	});
}