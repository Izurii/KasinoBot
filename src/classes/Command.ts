import { IRunFunction } from '../interfaces/IEvent';

class Command {

	public commandDescription: string;
	public commandRun: IRunFunction;

	public constructor(commandName: string, commandDescription: string, commandRun: IRunFunction) {
		this.commandDescription = commandDescription;
		this.commandRun = commandRun;
	}

}

export { Command };