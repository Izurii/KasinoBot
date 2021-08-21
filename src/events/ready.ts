import { IRunFunction } from '../interfaces/IEvent';

export const run: IRunFunction = async (client,) => {
	console.log(`Ready! ${client.readyAt}`);
};