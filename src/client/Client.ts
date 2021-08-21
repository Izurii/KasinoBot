import glob from 'glob';
import path from 'path/posix';

import { Client, Collection, Intents } from 'discord.js';
import { promisify } from 'util';
import { IEvent, IRunFunction } from '../interfaces/IEvent';
import { Controller } from '../controller/Controller';

const globPromise = promisify(glob);

class KasinoBot extends Client {
	
	private Controller = new Controller();

	public events: Collection<string, IEvent> = new Collection();

	public static commands: Array<{
		commandName: string,
		commandDescription: string,
		commandRun: IRunFunction
	}> = [];
	
	public constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES
			]
		});
	}

	public async Start(): Promise<void> {

		await this.login(process.env.DISCORD_TOKEN);

		const events: string[] = await globPromise(`${__dirname}/../events/*.ts`);
		events.map(async (value: string) => {
			const file: IEvent = await import(value);

			this.events.set(file.name, file);
			this.on(path.basename(value, path.extname(value)), file.run.bind(null, this));
		});

		await this.Controller.registerControllers();
		KasinoBot.commands = await this.Controller.getCommands();

	}

}

export { KasinoBot };