const Controller = require('./miscController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.roll_number = roll_number;
/**
 * @description Function that returns a discord message that contains n random values
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { Number } number=1 - N number of dices to roll
 * @returns Reply message to user that requested a dice roll
 */
async function roll_number (message, number=1) {

	if(number>10)
		return message.channel.send("N40 p0d3 p4ss4r de 10 caralho");
	else if(number===0)
		return message.channel.send("Z3r0 n40 d4 pô");

	var modificador = false;
	var endSearchString = message.content.search(/[+\-*\/]\s*/);
	if(endSearchString==-1||message.content==endSearchString) {
		endSearchString = message.content.length;
	} else {
		modificador = message.content.substring(endSearchString);
	}

	let numero_sorteado;
	if(message.content.includes("dm")) {
		numero_sorteado = message.content.substring(message.content.search(/[a-z]/)+2, endSearchString);
	} else {
		numero_sorteado = message.content.substring(message.content.search(/[a-z]/)+1, endSearchString);
	}

	let regex_block = new RegExp(/[a-z]/);
	if(numero_sorteado.startsWith('0'))
		return message.channel.send("Z3r0 n40 d4 pô");
	else if(regex_block.test(numero_sorteado)||numero_sorteado=='')
		return message.channel.send("41 n40 d4 n3 m3u.");

	let return_message = '';
	numero_sorteado = parseInt(numero_sorteado);
	if(numero_sorteado>999999)
		return message.channel.send("N40 tem d4d0 4551m n40 cac3t3");
	
	let numeros = [];
	for(let i = 0; i < number; i++) {
		let dado_rolado = await Controller.utilFunctions.randomInt(1, numero_sorteado+1);
		let resultado_final = modificador ? eval(dado_rolado + modificador) : dado_rolado;
		numeros.push(resultado_final);
		return_message += (':game_die: ``' + resultado_final + (modificador ? ` (${modificador})` : '') +'``');
	}

	if(message.content.includes("dm"))
		return_message += "  (Média: "+parseFloat(await Controller.utilFunctions.average(numeros)).toFixed(2)+")";

	return message.channel.send(return_message);

}