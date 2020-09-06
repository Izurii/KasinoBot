const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.execute = execute;

/**
 * @description Function that process the 'play', 'loop' command
 * @param { DiscordMessageType } message
 * @param { string } serverPrefix
 */
async function execute (message, serverPrefix) {

	const args = message.content.split(" ");
	const channels = message.guild.channels;

	var voiceChannel = [];
	const voice_channels = channels.cache.filter(c => c.type === 'voice' && (c.name !== 'AFK') && c.members.size > 0);
	voice_channels.forEach((channel) => { voiceChannel = channel; })

	if (voiceChannel.length == 0)
		return; // message.channel.send("PORRA TÔ SOZINHO AQUI VELHO :'( vão se foder.");

	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send(
			"PERMISSÕES DESGRAÇA!"
		);
	}

	let serverQueue = Controller.serverQueue.get(message.guild.id);
	if(Controller.ytdl.validateURL(args[1])&&!(Controller.ytpl.validateURL(args[1]))) {
		
		let video_link = args[1];
		
		const songInfo = await Controller.ytdl.getInfo(video_link);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url
		};
		
		let command = message.content.substring(1).split(" ");
		command = command[0];
		
		if (!serverQueue) {

			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 4,
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
				Controller.play(message.guild, queueContruct.songs[0]);

			} catch (e) {
				console.log(e);
				return message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+songInfo.title+"**");
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

	} else if (!Controller.ytdl.validateURL(args[1])&&(Controller.ytpl.validateURL(args[1]))){
		
		Controller.ytpl(args[1], { limit: Infinity }, (err,  result) => {

			let videos = result.items;
			let songs_list = [];
			let errors = 0;

			async function do_songs_list() {
				for(let item of videos) {
					const song = {
						title: item.title,
						url: item.url_simple
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
							await execute(modified_message);
						else
							serverQueue.songs.push(item);
							
					} catch (e) {
						console.log(e);
						errors++;
						message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+item.title+"**");
					}
				}

				let return_message = "Adicionado "+(result.total_items-errors)+" músicas na fila vindas da playlist: **"+result.title+"**";
				if(errors>0)
					return_message += " ("+errors+" música(s) deu/deram problema :s)";

				return message.channel.send(return_message);

			}

		});


	} else {

		let searchTerm = message.content.slice(serverPrefix.length+4);
		Controller.ytsr.getFilters(searchTerm, (err, filters) => {
			
			if(err) throw err;
			filter = filters.get('Type').find(o => o.name === 'Video');
			Controller.ytsr.getFilters(filter.ref, (err, filters) => { 

				if(err) throw err;
				var options = {
					limit: 5,
					nextpageRef: filter.ref,
					safeSearch: false
				}

				Controller.ytsr(null, options, async function(err, result) {

					let tracks = result.items;
					const embed = new Controller.Discord.MessageEmbed()
					.setColor('#ff2400')
					.setThumbnail('https://cdn.discordapp.com/attachments/715236372423639070/725129163609997312/nico.png')
					.setTitle('ESCOLHE AÍ CHEFIA')
					.setDescription(tracks.map((t, i) => `**${i+1} -** ${t.title}`).join("\n"))
					.setFooter('Tem 15 segundos pra escolher ou cancele '+serverPrefix+ 'cancel');
					message.channel.send(embed);
					
					const filter = m => m.content >= 1 && m.content <= 5;
					await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
					.then((collected) => {
		
						let index = parseInt(collected.first().content, 10);
						let track = tracks[index-1];
		
						let serverQueue = Controller.serverQueue.get(message.guild.id);
						let modified_message = message;
						modified_message.content = args[0]+' '+track.link;
						try {
							if(!serverQueue)
								execute(modified_message);
							else {
								const song = {
									title: track.title,
									url: track.link
								};
								serverQueue.songs.push(song);
								message.reply("T4 na f1l4 patr40, 4g0r4 s0 3sper4 0 buj40 ch3g4");
							}
						} catch (e) {
							console.log(e);
							message.reply("D3u 4lgum p4u n3s5e l1x0 4qu1: **"+track.title+"**");
						}
		
					}).catch((err) => {
						message.channel.send("<:cry:751921538462253077> 4band0n4 m3sm0 vai, baka~");
					});
		
				});
			});
		});
	}
}