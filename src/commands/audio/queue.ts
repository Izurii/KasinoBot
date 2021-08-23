import { Command } from '../../classes/Command';
import { ControllerAudio } from '../../controller/ControllerAudio';
import { ICommandFunction } from '../../interfaces/ICommand';

class Queue extends ControllerAudio implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	public constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {

		if(!message.guild) return;

		const serverConfig = await this.getServerConfig(message.guild.id);

		if(!serverConfig || serverConfig.songs.length <= 0) {
			return message.reply('N40 t3m n4d4 aqui pr4 v0c3 n40 cuzao');
		}

		const songList = serverConfig.songs.slice(0, 5);
		
		let songsString = songList.map((song, index: number) => `**${index + 1}** - **${song.title}**`).join('\n');
		if(serverConfig.songs.length > 5) songsString = songsString + '\n...';
		
		return message.reply(songsString);

	};

}

export { Queue };