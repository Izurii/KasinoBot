import { Command } from '../../classes/Command';
import { ControllerPorn } from '../../controller/ControllerPorn';
import { ISankakuComplexData } from '../../interfaces/ISankakuComplex';
import { ICommandFunction } from '../../interfaces/ICommand';

class Chan extends ControllerPorn implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {

		const response = await this.axios.get(this.sankakuComplexChanBaseUrl, {
			headers: this.axiosHeader,
			proxy: {
				host: process.env.WEBSHARE_PROXY_URL as string,
				port: parseInt(process.env.WEBSHARE_PROXY_PORT as string),
				auth: {
					username: process.env.WEBSHARE_PROXY_USERNAME as string,
					password: process.env.WEBSHARE_PROXY_PASSWORD as string
				}
			}
		}).catch((err) => console.log(err));

		if(response?.status == 200) {
			
			const data: Array<ISankakuComplexData> = response.data;
			const randomIndex = this.randomInt(0, data.length);

			const chosenItem = data[randomIndex];

			if(chosenItem.has_children || (chosenItem.file_size / 1000000) > 19.9) return this.commandFunction(client, message);

			const fileUrl = chosenItem.file_url;
			const score = chosenItem.total_score;

			const file = await this.axios.get(fileUrl, { responseType: 'arraybuffer' });
			const buffer = Buffer.from(file.data, 'utf-8');

			message.reply({
				content: '``CHAN-SankakuComplex``\n``Score: ' + score + '``',
				files: [buffer]
			});

		} else {
			message.reply('D3u algum4 b0st4 ot4r10, t3nt4 b41xar put4r1a outr4 h0r4');
		}

	};

}

export { Chan };