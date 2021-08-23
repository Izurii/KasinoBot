import { ICommandFunction } from '../interfaces/ICommand';
class Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	public constructor(commandDescription: string, commandRun: ICommandFunction) {
		this.commandDescription = commandDescription;
		this.commandRun = commandRun;
	}

}

export { Command };