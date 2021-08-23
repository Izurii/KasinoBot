import { Guild } from 'discord.js';
import { KasinoBot } from '../client/Client';

export interface IEventGuildCreate {
	(client: KasinoBot, guild: Guild): Promise<any>
}