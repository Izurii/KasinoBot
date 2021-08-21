import { Message } from 'discord.js';
import { KasinoBot } from '../client/Client';

export interface IRunFunction {
	(client: KasinoBot, message: Message, ...args: any[]): Promise<any>
}

export interface IEvent extends Event {
	name: string,
	category: string;
	run: IRunFunction;
}