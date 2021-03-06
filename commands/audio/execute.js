const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.execute = execute;

/**
 * @description Function that process the 'play', 'loop' command
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function execute (message, serverPrefix) {
	
	const split = message.content.split(" "); split.shift();
	const args = split.join(" ").trim();

	let command = message.content.substring(1).split(" ");
		command = command[0];
	
	if(args.length==0)
		return message.channel.send("Tu pr3c1s4 dig1t4r alg0 né irmão");

	var voiceChannel = [];
	const channels = message.guild.channels;
	const voice_channels = channels.cache.filter(c => c.type === 'voice' && (c.name !== 'AFK') && c.members.size > 0);
	voice_channels.forEach((channel) => {
		channel.members.forEach((member) => {
			if(member.id==message.author.id)
				voiceChannel = channel;
		});
	});

	if (voiceChannel.length == 0)
		return message.reply("vai se fuder, entr4 a1 m3u");

	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send(
			"PERMISSÕES DESGRAÇA!"
		);
	}

	let serverQueue = Controller.serverQueue.get(message.guild.id);

	if((Controller.ytpl.validateID(args))&&(!Controller.ytdl.validateURL(args))) {

		Controller.ytpl(args).then(result => {

			let videos = result.items;
			let songs_list = [];
			let errors = 0;

			async function do_songs_list() {
				for(let item of videos) {
					const song = {
						title: item.title,
						url: item.url
					};
					songs_list.push(song);
				}
				do_list();
			}
			do_songs_list();

			async function do_list() {
				
				for(let item of songs_list) {

					let serverQueue = Controller.serverQueue.get(message.guild.id);
					let modified_message = message;
					modified_message.content = serverPrefix+'play '+item.url;
					try {

						if(!serverQueue)
							await execute(modified_message, serverPrefix);
						else
							serverQueue.songs.push(item);
							
					} catch (e) {
						console.log(e);
						errors++;
						message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+item.title+"**");
					}
				}

				let return_message = "Adicionado "+(result.estimatedItemCount-errors)+" músicas na fila vindas da playlist: **"+result.title+"**";
				if(errors>0)
					return_message += " ("+errors+" música(s) deu/deram problema :s)";

				return message.channel.send(return_message);
			}
		});
		
	} else if(Controller.ytdl.validateURL(args)) {
		
		let video_link = args;
		
		const songInfo = await Controller.ytdl.getInfo(video_link);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url
		};
		
		if (!serverQueue) {

			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 0.5,
				playing: true,
				loop: false
			};

			try {
					
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				queueContruct.songs.push(song);

				let indexSong = queueContruct.songs.length - 1;
				if (command=="loop")
					queueContruct.songs[indexSong].loop = true;

				Controller.serverQueue.set(message.guild.id, queueContruct);
				Controller.play(message.guild, queueContruct.songs[0], serverPrefix);

			} catch (e) {
				console.log(e);
				return message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+songInfo.videoDetails.title+"**");
			}


		} else {

			try { 
			
				serverQueue.songs.push(song);

				let indexSong = serverQueue.songs.length - 1;
				let message_return;

				if (command=="loop") {
					serverQueue.songs[indexSong].loop = true;
					message_return = `${song.title} f01 4D10n4D4 N4 L15t4! BuT 1N 4 L00p`;
				} else {
					message_return = `${song.title} f01 4D10n4D4 N4 L15t4!`;
				}

				return message.channel.send(message_return);

			} catch (e) {
				console.log(e);
				return message.channel.send(err);
			}
		}
	
	} else {

		let searchTerm = message.content.slice(serverPrefix.length+5);
		Controller.ytsr.getFilters(searchTerm)
		.then(async (filters) => {

			filter = filters.get('Sort by').get('View count');
			filters2 = await Controller.ytsr.getFilters(searchTerm, filter.ref);
			filter2 = filters2.get('Type').get('Video');
			
			var options = { nextpageRef: filter2.ref, safeSearch: false, limit: 5 };

			Controller.ytsr(filter2.url, options)
			.then(async function(result) {

				let tracks = result.items;
				const embed = new Controller.Discord.MessageEmbed()
				.setColor('#ff2400')
				.setThumbnail('https://cdn.discordapp.com/attachments/715236372423639070/725129163609997312/nico.png')
				.setTitle('ESCOLHE AÍ CHEFIA')
				.setDescription(tracks.map((t, i) => `**${i+1} -** [${t.title}](${t.url}) (${t.duration ? t.duration : 'N/A'})`).join("\n"))
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
					modified_message.content = serverPrefix+(command=='loop' ? 'loop': 'play')+' '+track.url;
					try {
						if(!serverQueue)
							execute(modified_message, serverPrefix);
						else {
							const song = {
								title: track.title,
								url: track.url
							};
							serverQueue.songs.push(song);
							message.reply("T4 na f1l4 patr40, 4g0r4 s0 3sper4 0 buj40 ch3g4");
						}
					} catch (e) {
						console.log(e);
						message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+track.title+"**");
					}

				}).catch((err) => {
					console.log(err);
					message.channel.send("<:cry:751921538462253077> 4band0n4 m3sm0 vai, baka~");
				});
			}).catch((err) => {
				console.log(err);
				message.channel.send("<:cry:751921538462253077> Ixiii d3u c4c4 de p0mb0!@#?~");
			});
		}).catch((err) => {
			console.log(err);
			message.reply("K33p c4lm e v3m sug4r m1nha r0la. É n4d4, ch4m4 o d0n0.")
		});
	}
}
