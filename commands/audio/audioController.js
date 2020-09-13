//Exporting YouTube modules
exports.ytdl = require('ytdl-core-discord');
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

//Last play array shared between all filesz
var last_play = [];
exports.last_play = last_play;

//Timeout from server players
var timeout_player = [];
exports.timeout_player = timeout_player;

exports.stopAllPlayUnique = stopAllPlayUnique;
/**
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { Object } music - Object that carry the title and link of YouTube Video
 * @param  { string } music.title - Video title
 * @param  { string } music.url - Video url
 */
async function stopAllPlayUnique (message, music) {
	
	exports.stop(message);

	const channels = message.guild.channels;

	var voiceChannel = [];
	const voice_channels = channels.cache.filter(c => c.type === 'voice' && (c.name !== 'AFK') && c.members.size > 0);
	voice_channels.forEach((channel) => { voiceChannel = channel; });

	if (voiceChannel.length == 0)
		return;

	const queueContruct = {
		textChannel: message.channel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 4,
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