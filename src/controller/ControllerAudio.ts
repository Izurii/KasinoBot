import ytdl from 'ytdl-core';
import { Message, VoiceChannel } from 'discord.js';
import { Controller } from './Controller';
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';

export interface IServerConfig {
	audioPlayer: AudioPlayer,
	songs: Array<{
		title: string,
		length: string,
		url: string
	}>,
	volume: number,
	playing: boolean,
	loop: boolean,
	exitTimeout?: NodeJS.Timeout
}

class ControllerAudio extends Controller {

	public commandsPath = `${__dirname}/../commands/audio/*.ts`;

	public ytdl = ytdl;

	public static serverConfig: Map<string, IServerConfig> = new Map(); 
	
	constructor() {
		super();
	}

	public async createServerConfig(guildId: string, audioPlayer: AudioPlayer): Promise<IServerConfig> {
		ControllerAudio.serverConfig.set(guildId, {
			audioPlayer: audioPlayer,
			songs: [],
			volume: 0.5,
			playing: true,
			loop: false
		});
		return <IServerConfig> ControllerAudio.serverConfig.get(guildId);
	}

	public async getServerConfig(guildId: string): Promise<IServerConfig|false> {
		const serverConfig = ControllerAudio.serverConfig.get(guildId);
		if(!serverConfig) return false;
		return serverConfig as IServerConfig;
	}

	private async getUserVoiceChannel(message: Message): Promise<VoiceChannel|false> {

		const channels = message.guild?.channels;
		const voiceChannel = channels?.cache.filter(c => c.isVoice() && c.members.some(m => m.id == message.author.id));
		if(!voiceChannel) return false;
		return voiceChannel.first() as VoiceChannel;

	}

	public async execute(clientMessage: Message, url: string, queue = false): Promise<void|Message> {

		if(!url) return;

		const voiceChannel = await this.getUserVoiceChannel(clientMessage);
		if(!voiceChannel) return clientMessage.reply('Ow mano, v41 3scut4r uk3 se tu n40 t4 n3m num c4nal de v0z d3sgr4çad0');

		let connection = getVoiceConnection(voiceChannel.guild.id);
		if(!connection) {
			console.log(connection);
			connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator
			});
		}

		let serverConfig: IServerConfig;
		let audioPlayer: AudioPlayer;

		if(!(serverConfig = <IServerConfig> await this.getServerConfig(voiceChannel.guild.id))) {

			audioPlayer = createAudioPlayer();
			serverConfig = await this.createServerConfig(voiceChannel.guild.id, audioPlayer);

			serverConfig.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
				serverConfig.songs.shift();
				if(serverConfig.songs.length >= 1) {
					this.execute(clientMessage, serverConfig.songs[0].url, true);
				} else if(serverConfig.songs.length <= 0) {
					serverConfig.audioPlayer.stop();
					serverConfig.exitTimeout = setTimeout(() => {
						getVoiceConnection(voiceChannel.guild.id)?.destroy();
						ControllerAudio.serverConfig.delete(voiceChannel.guild.id);
					}, 60000);
				}
			});

			connection.subscribe(audioPlayer);

		} else {
			audioPlayer = serverConfig.audioPlayer;
			if(serverConfig.exitTimeout) clearTimeout(serverConfig.exitTimeout);
		}

		const song = await ytdl.getBasicInfo(url);
		const message = `Qu3 c0m3c3 4 f35t4: **${song.videoDetails.title}**`;

		if(!queue) {
			serverConfig.songs.push({
				title: song.videoDetails.title,
				length: song.videoDetails.lengthSeconds,
				url: song.videoDetails.video_url
			});
		}

		const readableStream = this.ytdl(url, {
			filter: 'audioonly'
		});

		const audioResource = createAudioResource(readableStream);
		
		if(audioPlayer.state.status == AudioPlayerStatus.Idle) {

			audioPlayer.play(audioResource);
			clientMessage.reply(message);

		} else if(audioPlayer.state.status == AudioPlayerStatus.Playing) {
			clientMessage.reply(`${song.videoDetails.title} f01 4D10n4D4 N4 L15t4!`);
		}

		serverConfig.audioPlayer.on('error', error => console.log(error));

		return;

	}

}

export { ControllerAudio };