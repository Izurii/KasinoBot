import { KasinoBot } from '../client/Client';
import { Message } from 'discord.js';
import { IRunFunction } from '../interfaces/IEvent';

export const run: IRunFunction = async (client, message: Message | undefined) => {

	if (message == undefined || message.author.bot || !message.guild) return;

	const command: string = message.content.substring(1).split(' ')[0].toLowerCase();

	KasinoBot.commands.filter(commandRegister => {
		(commandRegister.commandName == command) && commandRegister.commandRun(client, message);
	});
	
};