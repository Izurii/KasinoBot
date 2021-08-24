import { Command } from '../../classes/Command';
import { ControllerAudio } from '../../controller/ControllerAudio';
import { ICommandFunction } from '../../interfaces/ICommand';

class Play extends ControllerAudio implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {

		const args = this.getCommandArgs(message);

		if (args.length <= 0) return message.reply('Tu pr3c1s4 dig1t4r alg0 né o c0rn0');

		if(this.ytdl.validateURL(args)) {
			this.execute(message, args);
		}
	
		return;
	}

}

export { Play };