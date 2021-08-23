import glob from 'glob';
import path from 'path';
import xml2js from 'xml2js';

import { promisify } from 'util';
import { Command } from '../classes/Command';
import { ICommandFunction } from '../interfaces/ICommand';

const globPromise = promisify(glob);

class Controller {

	public axios = require('axios').default;

	private _controllers: string[] = [];

	private commands: Array<{
		commandName: string,
		commandDescription: string,
		commandRun: ICommandFunction
	}> | never = [];

	public async registerControllers(): Promise<void> {

		this._controllers = await globPromise(`${__dirname}/*.ts`, {
			'ignore' :[`${__dirname}/Controller.ts`]
		});

		for (const value of this._controllers) {

			const controllerImport = await import(value);
			const controller = controllerImport[Object.keys(controllerImport)[0]];
			const controlerClass = new controller();

			await this.registerCommands(controlerClass.commandsPath);

		}

	}

	public async getCommands(): Promise<Array<{
		commandName: string,
		commandDescription: string,
		commandRun: ICommandFunction
	}> | never> {
		return this.commands;
	}

	public async registerCommands(commandFolderPath: string): Promise<void> {

		if(!this.commands) this.commands = [];
		
		const commandFiles = await globPromise(commandFolderPath);

		commandFiles.map(async (value: string) => {
			
			const commandObj = await import(value);
			const command: Command = new commandObj[Object.keys(commandObj)[0]]();

			this.commands.push({
				'commandName': path.basename(value, path.extname(value)), 
				'commandDescription': command.commandDescription,
				'commandRun': command.commandRun
			});
			
		});

	}

	public async readXmlString(data: string): Promise<any> {
		const parser = new xml2js.Parser();
		return parser.parseStringPromise(data);
	}

	public async randomInt(min: number, max: number) : Promise<number> {
		return min + Math.floor((max - min) * Math.random());
	}

}
export { Controller };