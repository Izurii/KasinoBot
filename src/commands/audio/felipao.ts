import { Command } from '../../classes/Command';
import { ControllerAudio } from '../../controller/ControllerAudio';
import { ICommandFunction } from '../../interfaces/ICommand';

class Felipao extends ControllerAudio implements Command {
	
	private MP3Path = '../../audios/felipao.ogg';

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = '';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {
		await this.stopAllAndPlayMP3(message, 'FELIPAOO!!!', this.MP3Path);
	}

}

export { Felipao };