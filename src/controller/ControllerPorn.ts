import { Controller } from './Controller';

class ControllerPorn extends Controller {

	public commandsPath = `${__dirname}/../commands/porn/*.ts`;
	
	constructor() {
		super();
	}

}

export { ControllerPorn };