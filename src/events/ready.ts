import { IEventReady } from '../interfaces/IEventReady';

export const run: IEventReady = async (client,) => {
	
	console.log(`Ready! ${client.readyAt}`);
	client.user?.setPresence({ activities: [{ name: 'com seu cú | - help' }], status: 'online' });

};