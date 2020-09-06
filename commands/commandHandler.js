const JSDocTypes = require('../JSDocTypes');

//Importing commands controllers
const audioController = require('./audio/audioController');
const miscController = require('./misc/miscController');
const utilityController = require('./utility/utilityController');
const memeController = require('./meme/memeController');

/**
 * @description Function that handle commands send through messages
 * @param  { JSDocTypes.DiscordMessageType } message - Message that user sended to bot
 * @param  { string } prefix - Server bot prefix
 */
async function commandHandler (message, prefix) {

	let command = message.content.substring(1).split(" ");
	command = command[0];

	if (command.startsWith('play') || command.startsWith('loop')) {
		audioController.execute(message, prefix);
	} else if (command.startsWith('skip')) {
		audioController.skip(message);
	} else if (command.startsWith('stop')) {
		audioController.stop(message);
	} else if (command.startsWith('resume')) {
		audioController.resume(message);
	} else if (command.startsWith('pause')) {
		audioController.pause(message);
	} else if (command.startsWith('shuffle')){
		audioController.shuffle(message);
	} else if (command.startsWith('random')) {
		audioController.random(message);
	} else if (command.startsWith('cancel')) {
		return;
	} else if (command.startsWith('repeat')) {
		audioController.repeat(message);
	} else if (command.startsWith('boss')) {
		audioController.boss(message);
	} else if (command.startsWith('urss')) {
		audioController.urss(message);
	} else if (command.startsWith('magik')) {
		memeController.magik(message);
	} else if (command.startsWith('dolar')) {
		miscController.dolar(message);
	} else if (command.startsWith('euro')) {
		miscController.euro(message);
	} else if (command.startsWith('libra')) {
		miscController.libra(message);
	} else if (command.match('[0-9]')) {
		miscController.number_functions(message);
	} else if (command.startsWith('d')) {
		miscController.roll_number(message);
	} else if (command.startsWith('rule34')) {
		commands.rule34(message);
	} else if (command.startsWith('reverse')) {
		miscController.reverse(message);
	} else if (command.startsWith('idol')) {
		commands.idol(message);
	} else if (command.startsWith('chan')) {
		commands.chan(message);
	} else if (command.startsWith('anime')) {
		miscController.anime(message);
	} else if (command.startsWith('help')) {
		utilityController.help(message, prefix);
	} else if (command.startsWith('corona')) {
		miscController.corona(message);
	} else {
		message.reply("VAI TOMA NO CU ANALFABETO NA0 S4B3 D1G1T4R MEU");
	}
}

exports.commandHandler = commandHandler;