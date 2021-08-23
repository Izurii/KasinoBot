import { AxiosResponse } from 'axios';
import { Message, TextChannel } from 'discord.js';
import { Command } from '../../classes/Command';
import { ControllerPorn } from '../../controller/ControllerPorn';
import { ICommandFunction } from '../../interfaces/ICommand';

class Rule34 extends ControllerPorn implements Command {

	public commandDescription: string;
	public commandRun: ICommandFunction;

	private constructor() {
		super();
		this.commandDescription = 'teste';
		this.commandRun = this.commandFunction;
	}

	private commandFunction: ICommandFunction = async (client, message) => {
	
		const channel = await message.channel.fetch() as TextChannel;

		if(!channel.nsfw) {
			return message.reply('Somente em canal NSFW carai');
		}

		const tags = await this.formatTagsForBooru(message.content);
		const requestUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + tags;

		const request = await this.axios.get(requestUrl).then((response: AxiosResponse) => {
			return response.data;
		}).catch(() => {
			message.reply('tU d3rrub0u o 5erv1d0r c4c3t3');
		});

		this.readXmlString(request).then(async (result: any) : Promise<Message|void> => {
			
			let response = result.posts.post;

			if(response == undefined) {
				return message.reply('N4o 4ch4m0s n4d4 c0l3g4.');
			}

			const randomIndex = await this.randomInt(0, (response.length + 1));
			response = response[randomIndex];

			if(response['$'].has_children == true) {
				return;
			}

			const imageUrl = response['$'].file_url;
			const score = response['$'].score;

			message.reply(`\`\`Rule34\`\`\n\`\`Score: ${score}\`\`\n${imageUrl}`);

		}).catch((e: Error) => {
			console.log(e);
			return message.reply('Ihhh d3u p4u no 515t3m4.');
		});

		return;

	};

}

export { Rule34 };