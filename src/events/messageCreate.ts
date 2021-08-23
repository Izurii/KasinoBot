import { KasinoBot } from '../client/Client';
import { Message } from 'discord.js';
import { IRunFunction } from '../interfaces/IEvent';
import { KBGuild } from '../classes/KBGuild';
import { KBObject } from '../classes/KBObject';

export const run: IRunFunction = async (client, message: Message | undefined) => {

	if (message == undefined || message.author.bot || !message.guild) return;

	const guildId = message.guild.id;
	
	const guildObj = await KBGuild.loadByGuildID(guildId);
	if(!guildObj) throw KBObject.ERROR_UNKNOW;

	if(!message.content.startsWith(guildObj.data.KBGPrefix)) return;

	const command: string = message.content.substring(1).split(' ')[0].toLowerCase();

	KasinoBot.commands.filter(commandRegister => {
		(commandRegister.commandName == command) && commandRegister.commandRun(client, message);
	});
	
};