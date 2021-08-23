import { Command } from '../../classes/Command';
import { ControllerAudio } from '../../controller/ControllerAudio';
import { ICommandFunction } from '../../interfaces/ICommand';

class Boss extends ControllerAudio implements Command {
	
	private songMessage = 'BOSS BUCETA, SENTA QUE LÁ VEM PICA';
	private songUrl = 'https://www.youtube.com/watch?v=PBwMGiju0G4';

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = '';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {
		await this.stopAllAndPlaySong(message, this.songMessage, this.songUrl);
	}

}

export { Boss };