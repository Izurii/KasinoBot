import { KasinoBot } from '../client/Client';

export interface IEventReady {
	(client: KasinoBot): Promise<any>
}