import { Message } from 'discord.js';
import { KasinoBot } from '../client/Client';

export interface IEventMessageCreate {
	(client: KasinoBot, message: Message): Promise<any>
}