const JSDocTypes = require('../JSDocTypes');

//Importing commands controllers
const audioController = require('./audio/audioController');
const miscController = require('./misc/miscController');
const utilityController = require('./utility/utilityController');
const memeController = require('./meme/memeController');
const pornController = require('./porn/pornController');

/**
 * @description Function that handle commands send through messages
 * @param  { JSDocTypes.DiscordMessageType } message - Message that user sent to bot
 * @param  { string } prefix - Server bot prefix
 */
async function commandHandler (message, prefix) {

	let command = message.content.substring(1).split(" ");
	command = command[0];
	
	if ((command == 'play') || (command == 'loop')) {
		audioController.execute(message, prefix);
	} else if (command == 'playlist') {
		audioController.playlist(message, prefix);
	} else if (command == 'skip') {
		audioController.skip(message);
	} else if (command == 'stop') {
		audioController.stop(message);
	} else if (command == 'resume') {
		audioController.resume(message);
	} else if (command == 'pause') {
		audioController.pause(message);
	} else if (command == 'shuffle'){
		audioController.shuffle(message);
	} else if (command == 'random') {
		audioController.random(message);
	} else if (command == 'cancel') {
		return;
	} else if (command == 'repeat') {
		audioController.repeat(message);
	} else if (command == 'boss') {
		audioController.boss(message);
	} else if (command == 'volume') {
		audioController.volume(message);
	} else if (command == 'urss') {
		audioController.urss(message);
	} else if (command == 'cholamais') {
		audioController.cholamais(message);
	} else if (command == 'bilada') {
		audioController.bilada(message);
	} else if (command == 'felipao') {
		audioController.felipao(message);
	} else if (command == 'magik') {
		memeController.magik(message);
	} else if (command == 'rule34') {
		pornController.rule34(message);
	} else if (command == 'idol') {
		pornController.idol(message);
	} else if (command == 'chan') {
		pornController.chan(message);
	} else if (command == 'nhentai') {
		pornController.nhentai(message, prefix);
	} else if (command == 'anime') {
		miscController.anime(message);
	} else if (command == 'dolar') {
		miscController.dolar(message);
	} else if (command == 'euro') {
		miscController.euro(message);
	} else if (command == 'libra') {
		miscController.libra(message);
	} else if (command == 'iene') {
		miscController.iene(message);
	} else if (command[0].match('[0-9]')) {
		miscController.number_functions(message, prefix);
	} else if (command.match('[d][0-9]?[0-9]')) {
		miscController.roll_number(message);
	} else if (command == 'corona') {
		miscController.corona(message);
	} else if (command == 'reverse') {
		miscController.reverse(message);
	} else if (command == 'help') {
		utilityController.help(message, prefix);
	} else if (command == 'changeprefix') {
		utilityController.changePrefix(message, prefix);
	} else if (command == 'donate') {
		utilityController.donate(message);
	} else if (command == 'adm_message') {
		utilityController.adm_message(message);
	} else {
		message.reply("VAI TOMA NO CU ANALFABETO NA0 S4B3 D1G1T4R MEU");
	}
}

exports.commandHandler = commandHandler;