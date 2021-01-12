//Exporting YouTube modules
exports.ytdl = require('discord-ytdl-core');
exports.ytpl = require('ytpl');
exports.ytsr = require('ytsr');

//Vars
const JSDocTypes = require('../../JSDocTypes');
const DiscordMessageType = JSDocTypes.DiscordMessageType;
var serverQueue = new Map();

//Exporting needs
exports.Discord = require('discord.js');
exports.JSDocTypes = JSDocTypes;
exports.serverQueue = serverQueue;

//Exporting functions
exports.execute = require('./execute.js').execute;
exports.playlist = require('./playlist.js').playlist;
exports.play = require('./play.js').play;
exports.skip = require('./skip.js').skip;
exports.stop = require('./stop.js').stop;
exports.pause = require('./pause.js').pause;
exports.resume = require('./resume.js').resume;
exports.boss = require('./boss.js').boss;
exports.repeat = require('./repeat.js').repeat;
exports.shuffle = require('./shuffle.js').shuffle;
exports.volume = require('./volume.js').volume;
// exports.random = require('./random').random; passar os fun commands
exports.urss = require('./urss').urss;
exports.cyberpunk_music = require('./cyberpunk_music.js').cyberpunk_music;
exports.cholamais = require('./cholamais.js').cholamais;
exports.bilada = require('./bilada.js').bilada;
exports.felipao = require('./felipao.js').felipao;
exports.kubo = require('./kubo.js').kubo;
exports.mongol = require('./mongol.js').mongol;

//Last play array shared between all filesz
var last_play = [];
exports.last_play = last_play;

//Timeout from server players
var timeout_player = [];
exports.timeout_player = timeout_player;

exports.stopAllPlayUnique = stopAllPlayUnique;
/**
 * @description Stop the current song and clear the queue, after plays a fucking unique song
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { Object } music - Object that carry the title and link of YouTube Video
 * @param  { string } music.title - Video title
 * @param  { string } music.url - Video url
 */
async function stopAllPlayUnique (message, music) {
	
	exports.stop(message);

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
		return message.channel.send("Algu3m t3m que entr4r n4 v0z m3u");

	const queueContruct = {
		textChannel: message.channel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 0.5,
		playing: true,
		loop: false
	};

	queueContruct.songs.push(music);
	try {
		var connection = await voiceChannel.join();
		queueContruct.connection = connection;
		serverQueue.set(message.guild.id, queueContruct);
		exports.play(message.guild, queueContruct.songs[0]);
	} catch (err) {
		console.log(err);
		serverQueue.delete(message.guild.id);
		return message.reply("D3u 4lgum p4u n0 b0t ch4m4 o Führer l0c4l");
	}

}

exports.stopAllPlayMP3 = stopAllPlayMP3;
/**
 * @description - Stop the current song and clear the queue, after play a mp3 file
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { object } song - Object that carries the path to reach mp3 and message to send
 * @param  { string } song.message - Message to send
 * @param  { string } song.path - Path to mp3
 */
async function stopAllPlayMP3 (message, song) {

	exports.stop(message);

	const pathToMp3 = require('path').join(__dirname, song.path);

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
		return message.channel.send("Algu3m t3m que entr4r n4 v0z m3u");

	try {
		var connection = await voiceChannel.join();
		message.channel.send(song.message);
		connection.play(pathToMp3, { volume: 0.5 })
		.on("finish",() => {
			timeout_player[message.guild.id] = setTimeout(() => {
				timeout_player[guild.id] = null;
				voiceChannel.leave();
			}, 5000);
		});
	} catch (err) {
		console.log(err);
		serverQueue.delete(message.guild.id);
		return message.reply("D3u 4lgum p4u n0 b0t ch4m4 o Führer l0c4l");
	}

}