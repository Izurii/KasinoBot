const Controller = require('./utilityController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.changePrefix = changePrefix;

/**
 * @description Function that allows owner/administrators to change the prefix used to call the bot
 * @param  { DiscordMessageType } message - Message that user sent to bot
 * @param  { string } prefix - Server bot prefix
 */
async function changePrefix (message, prefix) {

	if(!message.member.guild.me.hasPermission('ADMINISTRATOR') && message.author.id !== message.guild.ownerID)
		return message.reply("T4 achand0 qu3 é c4s4 dx m4e Juan4?? Ch4m4 um ad3m1r aí par4 faz3r 3ss4 m3rda");
	
	let prefixMessage = await message.channel.send("O prefixo atual do bot é...");
	setTimeout(() => {
		prefixMessage.edit("Sou "+message.author.username+" e ad0r0~ DAR UMA SUGADA NUMA ROLA!"); 
		setTimeout(() => {
			prefixMessage.edit(
				'O Prefixo atual do bot é ``'+prefix+'``\n'+
				'Você deseja mudar ele? Responda reagindo a mensagem, você tem 15 segundos para reagir.'
			);
			prefixMessage.react('👍').then(() => prefixMessage.react('👎'));
			reactionHandler(prefixMessage);
		}, 500);
	}, 1000);
}

/**
 * @description Function that handles the reaction on the message and change the bot prefix if needed
 * @param { DiscordMessageType } message - Message that user sent to bot
 */
async function reactionHandler (message) {

	const filter = (reaction, user) => {
		return ['👍', '👎'].includes(reaction.emoji.name) && user.id !== message.author.id;
	};
	
	message.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();
		if (reaction.emoji.name === '👍') {

			message.reactions.removeAll();
			message.channel.send("**Por favor digite o novo prefixo. (Limite de 5 caracteres)**");
			
			const prefixFilter = response => {
				return (response.member.guild.me.hasPermission('ADMINISTRATOR') ||
					(response.author.id === message.guild.ownerID)) && response.content.length < 6;
			};
			
			message.channel.awaitMessages(prefixFilter, { max: 1, time: 15000, errors: ['time'] })
			.then(async (response) => {
				const newPrefix = response.first();
				try {
					await Controller.db.query(`UPDATE KBGuild SET KBGPrefix = '${newPrefix.content}' WHERE KBGGuildID = ${newPrefix.guild.id}`);
					newPrefix.reply("alteração realizada com sucesso.");
				} catch (error) {
					newPrefix.reply("Deu ruim chame o DONO.");
				}
			})
			.catch(response => {
				message.channel.send("Ab4nd0na m3xm0 m4né.");
			});

		} else {
			message.reply('Pau no seu cú mano');
		}
	})
	.catch(collected => {
	});
}