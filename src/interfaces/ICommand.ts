import { Message } from 'discord.js';
import { KasinoBot } from '../client/Client';

export interface ICommandFunction {
	(client: KasinoBot, message: Message, ...args: any[]): Promise<any>
}