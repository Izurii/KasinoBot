import { Command } from '../../classes/Command';
import { ControllerPorn } from '../../controller/ControllerPorn';
import { ISankakuComplexData } from '../../interfaces/ISankakuComplex';
import { ICommandFunction } from '../../interfaces/ICommand';

class Idol extends ControllerPorn implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {

		let requestUrl = this.sankakuComplexIdolBaseUrl;
		
		const args = this.getCommandArgs(message);
		const tags = await this.formatTagsForBooru(args);

		if(tags.length > 0) {
			requestUrl = requestUrl + '&tags=' + tags + '+-video';
		}
		const response = await this.axios.get(requestUrl, {
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

			if(chosenItem.has_children || (chosenItem.file_size / 1000000) > 17.9) return this.commandFunction(client, message);

			const fileUrl = 'https:' + chosenItem.file_url;
			const score = chosenItem.total_score;

			const file = await this.axios.get(fileUrl, { responseType: 'arraybuffer' }).catch((err) => console.log(err));

			if(!file) {
				message.reply('Deu b0st4 n4 h0ra de carreg4r 0 buff3r zé ru3la');
				return;
			}

			const buffer = Buffer.from(file?.data, 'utf-8');
			const fileExtObj = await this.fileType.fromBuffer(buffer);
			const fileExt = fileExtObj?.ext == 'm4v' ? 'mp4' : fileExtObj?.ext;

			await message.reply({
				content: '``IDOL-SankakuComplex``\n``Score: ' + score + '``',
				files: [{
					attachment: buffer,
					name: 'file.' + fileExt
				}]
			});

			buffer.fill(0);

		} else {
			message.reply('D3u p1111ccc44444 ch4m4 o furro l0c4l!!!');
		}

	};

}

export { Idol };