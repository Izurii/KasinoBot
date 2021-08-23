import { Command } from '../../classes/Command';
import { ControllerMisc } from '../../controller/ControllerMisc';
import { ICommandFunction } from '../../interfaces/ICommand';

class Reverse extends ControllerMisc implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {

		const msg = message.content.substr(8);
		message.reply(msg.split('').reverse().join(''));

	};

}

export { Reverse };