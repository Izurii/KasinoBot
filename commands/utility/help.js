const Controller = require('./utilityController')
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.help = help;
/**
 * @description Function that process the call of 'help' command
 * @param { DiscordMessageType } message - Message that user sended to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function help (message, serverPrefix) {
	const args = message.content.split(" ");
	if(args.length > 1)
		help_with_args(message, serverPrefix);
	else
		help_without_args(message);
}

/**
 * @description Function that returns a message with all commands available on Kasino
 * @param { DiscordMessageType } message - Message that user sended to bot
 */
async function help_without_args (message) {

	let commands_list = {
		'Comandos de t0c4r a f35t4 t0d4:' : [
			'boss',
			'play',
			'loop',
			'pause',
			'resume',
			'repeat',
			'random',
			'shuffle',
			'stop',
			'skip',
		],
		'Comandos m3m14d0s: ' : [
			'magik',
		],
		'C0m4nd05 s3ksua1s: ' : [
			'rule34',
			'idol',
			'chan',
		],
		'C0m4ndus 1nút3is (l3g41s): ' : [
			'anime',
			'dolar',
			'euro',
			'libra',
			'd',
			'reverse',
			'corona',
		],
	};

	let embed_fields_data = [];
	for (var key in commands_list) {
		let	embed_field_data = { name: key, value: '' }
		commands_list[key].forEach((command) => {
			embed_field_data.value += '``'+command+'`` '			
		});
		embed_fields_data.push(embed_field_data);
	}

	var attachment = new Controller.Discord.MessageAttachment("./images/bot/logo.png", "logo.png");
	var help_message = new Controller.Discord.MessageEmbed()
		.setColor('#ff2400')
		.attachFiles(attachment)
		.setThumbnail('attachment://logo.png')
		.addFields(embed_fields_data)
		.setDescription('4qui t3m0s a l1st4 g3ral de c0ma4nd05 do b0t, t40k3y?')
		.setFooter('Se quiser saber mais sobre um comando de "-help <comando>"')
		.setAuthor('Izurii Hootoh - Dono do KASINÃO');
	
	message.channel.send(help_message);
}

/**
 * @description Function that returns a message with details about a specific command that is passed as an argument on command
 * @param { DiscordMessageType } message - Message that user sended to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function help_with_args (message, serverPrefix) {

	const args = message.content.split(" ");

	if(args.length > 2)
		return message.channel.send("Tu dig1t0u m4is do que d3v1a.");
	
	let command = args[1];
	
	let commands_description = {
		//Audio commands
		'boss' : 'Para tudo o que bot está fazendo para tocar uma puta música épica de boss.',
		'play': 'Consegue tocar músicas através de links do YouTube ou através da selação quando você digita uma frase, como também pode tocar playlists inteiras.',
		'loop': 'Consegue tocar músicas através de links do YouTube ou através da selação quando você digita uma frase, como também pode tocar playlists inteiras. (Porém ele irá repetir o que você colocou por tempo indeterminado)',
		'pause': 'Pausa o que o bot está tocando.',
		'resume': 'Resume o que o bot estava tocando.',
		'repeat': 'Repete a última coisa tocada no server.',
		'random': 'Colocar para tocar um vídeo aleatório do YouTube.',
		'shuffle': 'Mistura a fila atual de músicas do servidor.',
		'stop': 'Para de tocar o que está rolando e limpa a fila de músicas.',
		'skip': 'Pula a música que está tocando, ou se só tiver uma ele corta a música.',
		'urss': 'Tca o hino da união soviética.',
		
		//Meme commands
		'magik': 'It is what it is',

		//Porn commands
		'rule34': 'It is what it is',
		'idol': 'It is what it is',
		'chan': 'It is what it is',

		//Misc commands
		'anime': 'Manda de volta um anime aleatório, vai que é bom.',
		'dolar': 'Mostra a cotação atual do dólar.',
		'euro': 'Mostra a cotação atual do euro.',
		'libra': 'Mostra a cotação atual da libra.',
		'd': 'Basicamente um sorteador de números ou dados por assim dizer.',
		'reverse': 'Espelha uma frase.',
		'corona': 'Retorna dados sobre o estado atual do COVID-19 em determinado país.'
	}

	let commands_usage = {
		//Audio commands
		'boss' : serverPrefix+'boss (É só mandar o comando, sem frescuras)',
		'play': serverPrefix+'play <musica>',
		'loop': serverPrefix+'loop <musica>',
		'pause': serverPrefix+'pause (É só mandar o comando, sem frescuras)',
		'resume': serverPrefix+'resume (É só mandar o comando, sem frescuras)',
		'repeat': serverPrefix+'repeat (É só mandar o comando, sem frescuras)',
		'random': serverPrefix+'resume (É só mandar o comando, sem frescuras)',
		'shuffle': serverPrefix+'shuffle (É só mandar o comando, sem frescuras)',
		'stop': serverPrefix+'stop (É só mandar o comando, sem frescuras)',
		'skip': serverPrefix+'skip (É só mandar o comando, sem frescuras)',
		'urss': serverPrefix+'urss (É só mandar o comando, sem frescuras)',
		
		//Meme commands
		'magik': serverPrefix+'magik <$>',

		//Porn commands
		'rule34': serverPrefix+'rule34 <tags>',
		'idol': serverPrefix+'idol <tags>',
		'chan': serverPrefix+'chan <tags>',

		//Misc commands
		'anime': serverPrefix+'anime (É só mandar o comando, sem frescuras)',
		'dolar': serverPrefix+'dolar (É só mandar o comando, sem frescuras)',
		'euro': serverPrefix+'euro (É só mandar o comando, sem frescuras)',
		'libra': serverPrefix+'libra (É só mandar o comando, sem frescuras)',
		'd': serverPrefix+'<$>d<@> ou ${prefix}<$>dm<@> Caso você utiliza segundo comando, ele irá devolver os sorteios e entre parênteses a média dos sorteios.',
		'reverse': serverPrefix+'reverse <frase>',
		'corona': serverPrefix+'corona ou "${prefix}corona <país>". Caso você mande o comando sem argumentos ele irá retornar uma lista com possíveis países para você ver os dados do COVID-19, lembrando que você deverá utilizar o código do país não o nome.',
	}

	let commands_parameters = {
		//Audio commands
		'play': '``musica`` aqui você pode passar um link de uma música do YouTube ou até mesmo uma playlist. Caso você não tenha um link você digitar algo na frente e o bot irá te mostrar 5 opções para você escolher.',
		'loop': '``musica`` aqui você pode passar um link de uma música do YouTube ou até mesmo uma playlist. Caso você não tenha um link você digitar algo na frente e o bot irá te mostrar 5 opções para você escolher.',
		
		//Meme commands
		'magik': '``$`` Aqui você coloca um número de 1 a 10, esse número indica o quanto o bot irá magikar essa imagem, quanto maior o valor maior o estrago e mais demorado é.',

		//Porn commands
		'rule34': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas oi mais palavras sendo uma tag separe as palavras por um underline.',
		'idol': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas oi mais palavras sendo uma tag separe as palavras por um underline.',
		'chan': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas oi mais palavras sendo uma tag separe as palavras por um underline.',

		//Misc commands
		'd': '``$`` Nesse primeiro parâmetro você pode colocar um número de dados a serem sorteado, podendo ser de 1 a 10 sendo que esse parâmetro é ``OPCIONAL`` então caso você não digite ele irá entender como ``1``.\n\n'
		+'``@`` No segundo parâmetro você digita o número máximo a ser sorteado, então se você colocar 5000 ele irá sortear uma determinada quantidade de dados de 1 até 5000, sendo o número máximo 999999.',
		'reverse': '``frase`` Basicamente o que está na frente do comando, não há nenhum impedimento.',
		'corona': '<país> esse parâmetro é o código do país.',
	}

	if(commands_description[command]==undefined)
		return message.channel.send("Esse comando não existe chefia.");

	let embed_fields_data = [
		{ name: 'Descrição do comando: ', value: commands_description[command] },
		{ name: 'Uso do comando: ', value: commands_usage[command] },
	];

	if(commands_parameters[command]!==undefined)
		embed_fields_data.push({ name: 'Parâmetros utilizados pelo comando: ', value: commands_parameters[command] });

	var attachment = new Controller.Discord.MessageAttachment("./images/bot/logo.png", "logo.png");
	var help_message = new Controller.Discord.MessageEmbed()
		.setColor('#ff2400')
		.attachFiles(attachment)
		.setThumbnail('attachment://logo.png')
		.addFields(embed_fields_data)
		.setFooter('Tá aí filho, se não entendeu contate o ADEMIR.')
		.setAuthor('Explicação do comando '+serverPrefix+command);
	
	message.channel.send(help_message);

}