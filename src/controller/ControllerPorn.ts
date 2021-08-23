import { Controller } from './Controller';

class ControllerPorn extends Controller {

	public commandsPath = `${__dirname}/../commands/porn/*.ts`;
	
	constructor() {
		super();
	}

	public async formatTagsForBooru(text: string): Promise<string> {
	
		const tags = text.substr(text.indexOf(' ') + 1).replace(' ', '+');
	
		return tags;
	}

}

export { ControllerPorn };