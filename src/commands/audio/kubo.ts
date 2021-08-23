import { Command } from '../../classes/Command';
import { ControllerAudio } from '../../controller/ControllerAudio';
import { ICommandFunction } from '../../interfaces/ICommand';

class Kubo extends ControllerAudio implements Command {
	
	private MP3Path = '../../audios/kubo.ogg';

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = '';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {
		await this.stopAllAndPlayMP3(message, 'KUUBOOOOOOOOOO!!', this.MP3Path);
	}

}

export { Kubo };