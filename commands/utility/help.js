const Controller = require('./utilityController')
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.help = help;
/**
 * @description Function that process the call of 'help' command
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function help (message, serverPrefix) {
	
	const split = message.content.split(" "); split.shift();
	const args = split.join("").trim();

	if(args.length > 1)
		help_with_args(message, serverPrefix);
	else
		help_without_args(message);
		
}

/**
 * @description Function that returns a message with all commands available on Kasino
 * @param { DiscordMessageType } message - Message that user sent to bot
 */
async function help_without_args (message) {

	let commands_list = {
		'Comandos de t0c4r a f35t4 t0d4:' : [
			'urss',
			'boss',
			'2077',
			'cholamais',
			'bilada',
			'felipao',
			'mongol',
			'wiisports',
			'deadman',
			'oxii',
			'kubo',
			'play',
			'playlist',
			'loop',
			'pause',
			'resume',
			'repeat',
			'random',
			'shuffle',
			'stop',
			'skip',
			'volume',
		],
		'Comandos m3m14d0s: ' : [
			'magik',
		],
		'C0m4nd05 s3ksua1s: ' : [
			'rule34',
			'idol',
			'chan',
			'nhentai',
		],
		'C0m4ndus 1nút3is (l3g41s): ' : [
			'anime',
			'dolar',
			'euro',
			'libra',
			'iene',
			'd',
			'reverse',
			'corona',
		],
		'C0mand5s 0K: ' : [
			'help',
			'changeprefix',
		]
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
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @param { string } serverPrefix - Server bot prefix
 */
async function help_with_args (message, serverPrefix) {

	const split = message.content.split(" "); split.shift();
	const args = split.join("").trim();

	let command = args;
	
	let commands_description = {
		//Audio commands
		'urss' : 'Well, MOTHERLAND!!!',
		'boss' : 'Para tudo o que bot está fazendo para tocar uma puta música épica de boss.',
		'2077' : 'サイバーパンク 2.0.7.7!',
		'cholamais': 'CHOLA MAIS SEU COLNO!!!',
		'bilada': 'BILADA',
		'felipao': 'FELIPAO!',
		'mongol': 'M0NG0!',
		'wiisports': '!!!',
		'deadman': 'OMAE WA MOU, SHINDEIRU!',
		'oxii' : 'Oooxxiii!',
		'kubo' : 'MaM44a4a4c0o0o!!i!i!!',
		'play': 'Consegue tocar músicas através de links do YouTube ou através da seleção quando você digita uma frase, como também pode tocar playlists inteiras.',
		'playlist': 'Consegue tocar playlists através de links do YouTube ou através da seleção quando você digita uma frase.',
		'loop': 'Consegue tocar músicas através de links do YouTube ou através da seleção quando você digita uma frase, como também pode tocar playlists inteiras. (Porém ele irá repetir o que você colocou por tempo indeterminado)',
		'pause': 'Pausa o que o bot está tocando.',
		'resume': 'Resume o que o bot estava tocando.',
		'repeat': 'Repete a última coisa tocada no server.',
		'random': 'Colocar para tocar um vídeo aleatório do YouTube.',
		'shuffle': 'Mistura a fila atual de músicas do servidor.',
		'stop': 'Para de tocar o que está rolando e limpa a fila de músicas.',
		'skip': 'Pula a música que está tocando, ou se só tiver uma ele corta a música.',
		'volume': 'Altera o volume do que o bot está tocando agora.',
		
		//Meme commands
		'magik': 'It is what it is',

		//Porn commands
		'rule34': 'It is what it is',
		'idol': 'It is what it is',
		'chan': 'It is what it is',
		'nhentai': 'It is what it is',

		//Misc commands
		'anime': 'Manda de volta um anime aleatório, vai que é bom.',
		'dolar': 'Mostra a cotação atual do dólar.',
		'euro': 'Mostra a cotação atual do euro.',
		'libra': 'Mostra a cotação atual da libra.',
		'iene': 'Mostra a cotação atual do iene.',
		'd': 'Basicamente um sorteador de números ou dados por assim dizer.',
		'reverse': 'Espelha uma frase.',
		'corona': 'Retorna dados sobre o estado atual do COVID-19 em determinado país.',

		//Util commands
		'help': 'Lista de comandos e seus usos.',
		'donate': 'Instruções para doações',
		'changeprefix' : 'Muda o prefixo do servidor utilizado para chamar o bot.',

	}

	let commands_usage = {
		//Audio commands
		'urss': serverPrefix+'urss (É só mandar o comando, sem frescuras)',
		'boss' : serverPrefix+'boss (É só mandar o comando, sem frescuras)',
		'2077' : serverPrefix+'2077 (É só mandar o comando, sem frescuras)',
		'cholamais' : serverPrefix+'cholamais (É só mandar o comando, sem frescuras)',
		'bilada' : serverPrefix+'bilada (É só mandar o comando, sem frescuras)',
		'felipao' : serverPrefix+'felipao (É só mandar o comando, sem frescuras)',
		'mongol' : serverPrefix+'mongol (É só mandar o comando, sem frescuras)',
		'wiisports' : serverPrefix+'wiisports (É só mandar o comando, sem frescuras)',
		'deadman' : serverPrefix+'deadman (É só mandar o comando, sem frescuras)',
		'oxii' : serverPrefix+'oxii (É só mandar o comando, sem frescuras)',
		'kubo' : serverPrefix+'kubo (É só mandar o comando, sem frescuras)',
		'play': serverPrefix+'play <musica>',
		'playlist': serverPrefix+'playlist <lista>',
		'loop': serverPrefix+'loop <musica>',
		'pause': serverPrefix+'pause (É só mandar o comando, sem frescuras)',
		'resume': serverPrefix+'resume (É só mandar o comando, sem frescuras)',
		'repeat': serverPrefix+'repeat (É só mandar o comando, sem frescuras)',
		'random': serverPrefix+'resume (É só mandar o comando, sem frescuras)',
		'shuffle': serverPrefix+'shuffle (É só mandar o comando, sem frescuras)',
		'stop': serverPrefix+'stop (É só mandar o comando, sem frescuras)',
		'skip': serverPrefix+'skip (É só mandar o comando, sem frescuras)',
		'volume': serverPrefix+'volume <@>',
		
		//Meme commands
		'magik': serverPrefix+'magik <$>',

		//Porn commands
		'rule34': serverPrefix+'rule34 <tags>',
		'idol': serverPrefix+'idol <tags>',
		'chan': serverPrefix+'chan <tags>',
		'nhentai': serverPrefix+'nhentai <tags>',

		//Misc commands
		'anime': serverPrefix+'anime (É só mandar o comando, sem frescuras)',
		'dolar': serverPrefix+'dolar (É só mandar o comando, sem frescuras)',
		'euro': serverPrefix+'euro (É só mandar o comando, sem frescuras)',
		'libra': serverPrefix+'libra (É só mandar o comando, sem frescuras)',
		'iene': serverPrefix+'iene (É só mandar o comando, sem frescuras)',
		'd': serverPrefix+'<$>d<@> ou ${prefix}<$>dm<@> Caso você utiliza segundo comando, ele irá devolver os sorteios e entre parênteses a média dos sorteios.',
		'reverse': serverPrefix+'reverse <frase>',
		'corona': serverPrefix+'corona ou "${prefix}corona <país>". Caso você mande o comando sem argumentos ele irá retornar uma lista com possíveis países para você ver os dados do COVID-19, lembrando que você deverá utilizar o código do país não o nome.',
		
		//Util commands
		'help': serverPrefix+'help <comando>',
		'donate': serverPrefix+'donate (É so mandar o comando, com muito carinho)',
		'changeprefix': serverPrefix+'changeprefix (É só mandar o comando, sem frescuras)',

	}

	let commands_parameters = {
		//Audio commands
		'play': '``musica`` aqui você pode passar um link de uma música do YouTube ou até mesmo uma playlist. Caso você não tenha um link você digitar algo na frente e o bot irá te mostrar 5 opções para você escolher.',
		'playlist': '``lista`` aqui você pode passar um link de uma playlist do YouTube. Caso você não tenha um link você digitar algo na frente e o bot irá te mostrar 5 opções para você escolher.',
		'loop': '``musica`` aqui você pode passar um link de uma música do YouTube ou até mesmo uma playlist. Caso você não tenha um link você digitar algo na frente e o bot irá te mostrar 5 opções para você escolher.',
		'volume': '``@`` você deve digitar um número de 1 a 5, ele irá alterar o volume do áudio que o bot está tocando no momento para ele. O valor padrão é ``1``.',

		//Meme commands
		'magik': '``$`` Aqui você coloca um número de 1 a 10, esse número indica o quanto o bot irá magikar essa imagem, quanto maior o valor maior o estrago e mais demorado é.',

		//Porn commands
		'rule34': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas ou mais palavras sendo uma tag separe as palavras por um underline.\nPode ser utilizado sem ``tags``, nesse caso ele irá retornar uma coisa aleatória.',
		'idol': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas ou mais palavras sendo uma tag separe as palavras por um underline.\nPode ser utilizado sem ``tags``, nesse caso ele irá retornar uma coisa aleatória.',
		'chan': '``tags`` Sistema de tags de boorus da vida aí. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas ou mais palavras sendo uma tag separe as palavras por um underline.\nPode ser utilizado sem ``tags``, nesse caso ele irá retornar uma coisa aleatória.',
		'nhentai': '``tags`` Sistema de tags bem simples. Se digitar duas palavras separadas isso indica duas tags diferente, se quiser digitar duas ou mais palavras sendo apenas uma tag coloque a palavra entre aspas.\nPode ser utilizado sem ``tags``, nesse caso ele irá retornar um doujin aleatório.',

		//Misc commands
		'd': '``$`` Nesse primeiro parâmetro você pode colocar um número de dados a serem sorteado, podendo ser de 1 a 10 sendo que esse parâmetro é ``OPCIONAL`` então caso você não digite ele irá entender como ``1``.\n\n'
		+'``@`` No segundo parâmetro você digita o número máximo a ser sorteado, então se você colocar 5000 ele irá sortear uma determinada quantidade de dados de 1 até 5000, sendo o número máximo 999999.',
		'reverse': '``frase`` Basicamente o que está na frente do comando, não há nenhum impedimento.',
		'corona': '<país> esse parâmetro é o código do país.',

		//Util commands
		'help': '``comando`` Você pode utilizar o comando help sem argumento algum e ele irá te retornar uma lista de comandos no bot, mas caso haja um comando na frente ele irá te retornar como utilizar o comando.'

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
