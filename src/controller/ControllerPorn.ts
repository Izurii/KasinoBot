import { Controller } from './Controller';

class ControllerPorn extends Controller {

	public commandsPath = `${__dirname}/../commands/porn/*.ts`;
	
	constructor() {
		super();
	}

	public async formatTagsForBooru(text: string): Promise<string> {

		const split = text.split(' '); split.shift();
		const args = split.join(' ').trim();
	
		const tags = args.substr(args.indexOf(' ') + 1).replace(' ', '+');
	
		return tags;
	}

}

export { ControllerPorn };