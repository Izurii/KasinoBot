import { Command } from '../../classes/Command';
import { ControllerMisc } from '../../controller/ControllerMisc';
import { ICommandFunction } from '../../interfaces/ICommand';

class Euro extends ControllerMisc implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {
		
		const moeda = await this.getValueCurrency('EUR', 'BRL');
	
		if(!moeda) {
			return message.reply('M3u l0rd d3u 4lg0 de err4d0 p41, v41 fic4r par4 ma15 tard3.');
		}
	
		const valor = moeda.toString().replace('.', ',');
		return message.reply('``Euro está: R$' + valor + '``');
		
	};

}

export { Euro };