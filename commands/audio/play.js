const Controller = require('./audioController');
const DiscordGuildType = Controller.JSDocTypes.DiscordGuildType;

exports.play = play;
/**
 * @description Function that process the guild's request to play a YT video
 * @param { DiscordGuildType } guild  - Discord guild that executed a play like function
 * @param  { Object } song - Object that carry the title and link of YouTube Video and loop state of that song
 * @param  { string } song.title - Video title
 * @param  { string } song.url - Video url
 * @param  { boolean } song.loop - Loop state of that specific song
 * @param  { string } serverPrefix - Server bot prefix
 */
async function play(guild, song, serverPrefix) {

	const serverQueue = Controller.serverQueue.get(guild.id);

	if (serverQueue.voiceChannel.members.size <= 1 && serverQueue.songs.length > 1) {
		//serverQueue.textChannel.send("B4nd0 de g4y, m3 aband0nar4m aqu1. PARA VOLTAR A MÚsica É sÓ dar o comando ``"+serverPrefix+"resume``");
		//return;
	}

	if (!song) {
		Controller.serverQueue.delete(guild.id);
		Controller.timeout_player[guild.id] = setTimeout(() => {
			Controller.timeout_player[guild.id] = null;
			serverQueue.voiceChannel.leave();
		}, 60000);
		return;
	}

	let message_eterna = `Qu3 c0m3c3 4 f35t4 et3rn4: **${song.title}**`;
	let message = `Qu3 c0m3c3 4 f35t4: **${song.title}**`;

	if (!serverQueue.loop&&song.loop) {
		serverQueue.textChannel.send(message_eterna);
	} else if(!serverQueue.loop&&!song.loop) {
		serverQueue.textChannel.send(message);
	}

	if (song.loop)
		serverQueue.loop = true;

	if(Controller.timeout_player[guild.id])
		clearTimeout(Controller.timeout_player[guild.id]);

	Controller.last_play[guild.id] = song.url;
	
	try {
		const dispatcher = serverQueue.connection
			.play(await Controller.ytdl(song.url), { type: 'opus' })
			.on("finish",async () => {

			
				if (!serverQueue.loop) {
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
				} else {
					play(guild, serverQueue.songs[0]);
				}
			})
			.on("error", error => console.error(error));
		dispatcher.setVolume(serverQueue.volume);
	} catch (error) {
		console.log(error);
		serverQueue.songs.shift();
		serverQueue.textChannel.send(`D3u p4u n3ss4 buc3t4 aqu1: **${song.title}** (O vídeo provavelmente está privado, +18 ou está indisponível para a região)`);
		play(guild, serverQueue.songs[0]);
	}
	
}
