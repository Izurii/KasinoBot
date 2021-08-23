import ytdl from 'ytdl-core';
import { Message, VoiceChannel } from 'discord.js';
import { Controller } from './Controller';
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { createReadStream } from 'fs';

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

	public async createServerConfig(guildId: string, audioPlayer: AudioPlayer|false = false): Promise<IServerConfig> {

		ControllerAudio.serverConfig.set(guildId, {
			audioPlayer: audioPlayer ? audioPlayer : createAudioPlayer(),
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

	public async execute(message: Message, url: string, queue = false): Promise<void|Message> {

		if(!url) return;

		const voiceChannel = await this.getUserVoiceChannel(message);
		if(!voiceChannel) return message.reply('Ow mano, v41 3scut4r uk3 se tu n40 t4 n3m num c4nal de v0z d3sgr4çad0');

		let connection = getVoiceConnection(voiceChannel.guild.id);
		if(!connection) {
			connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator
			});
		}

		let serverConfig: IServerConfig;

		if(!(serverConfig = <IServerConfig> await this.getServerConfig(voiceChannel.guild.id))) {

			serverConfig = await this.createServerConfig(voiceChannel.guild.id);

			serverConfig.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
				serverConfig.songs.shift();
				if(serverConfig.songs.length >= 1) {
					this.execute(message, serverConfig.songs[0].url, true);
				} else if(serverConfig.songs.length <= 0) {
					serverConfig.audioPlayer.stop();
					serverConfig.exitTimeout = setTimeout(() => {
						getVoiceConnection(voiceChannel.guild.id)?.destroy();
						ControllerAudio.serverConfig.delete(voiceChannel.guild.id);
					}, 60000);
				}
			});

			connection.subscribe(serverConfig.audioPlayer);

		} else {
			if(serverConfig.exitTimeout) clearTimeout(serverConfig.exitTimeout);
		}

		const audioPlayer: AudioPlayer = serverConfig.audioPlayer;

		const song = await ytdl.getBasicInfo(url);
		const messagePlay = `Qu3 c0m3c3 4 f35t4: **${song.videoDetails.title}**`;

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
			message.reply(messagePlay);

		} else if(audioPlayer.state.status == AudioPlayerStatus.Playing) {
			message.reply(`${song.videoDetails.title} f01 4D10n4D4 N4 L15t4!`);
		}

		serverConfig.audioPlayer.on('error', error => console.log(error));

		return;

	}

	public async stopAllAndPlayMP3(message: Message, songMessage: string, MP3Path: string): Promise<Message|void> {

		if(!message || !message.guild) return;

		const voiceChannel = await this.getUserVoiceChannel(message);
		if(!voiceChannel) return message.reply('Algu3m t3m que entr4r n4 v0z m3u');

		const audioPlayer = createAudioPlayer();

		let serverConfig = <IServerConfig> await this.getServerConfig(message.guild.id);
		if(!serverConfig) {
			serverConfig = await this.createServerConfig(message.guild.id, audioPlayer);
		}

		let connection = getVoiceConnection(voiceChannel.guild.id);
		if(!connection) {
			
			connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator
			});

			connection.subscribe(serverConfig.audioPlayer);

		}

		const pathToMp3 = require('path').join(__dirname, MP3Path);

		serverConfig.audioPlayer.pause();
		connection.subscribe(audioPlayer);

		if(serverConfig.exitTimeout) {
			clearTimeout(serverConfig.exitTimeout);
		}

		const audioResource = createAudioResource(createReadStream(pathToMp3));
		audioPlayer.play(audioResource);

		audioPlayer.on(AudioPlayerStatus.Idle, async () => {
			if(serverConfig.songs.length <= 0) {
				serverConfig.exitTimeout = setTimeout(() => {
					getVoiceConnection(voiceChannel.guild.id)?.destroy();
					ControllerAudio.serverConfig.delete(voiceChannel.guild.id);
				}, 15000);
			} else if (serverConfig.songs.length >= 1) {
				connection?.subscribe(serverConfig.audioPlayer);
				serverConfig.audioPlayer.unpause();
			}
		});

		return message.reply(songMessage);

	}
	
}

export { ControllerAudio };