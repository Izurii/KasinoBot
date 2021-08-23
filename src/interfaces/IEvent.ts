import { Guild, Message } from 'discord.js';
import { KasinoBot } from '../client/Client';

export interface IRunFunction {
	(client: KasinoBot, guild?: Guild, message?: Message, ...args: any[]): Promise<any>
}

export interface IEvent extends Event {
	name: string,
	category: string;
	run: IRunFunction;
}