import { AxiosResponse } from 'axios';
import { Controller } from './Controller';

class ControllerMisc extends Controller {

	public commandsPath = `${__dirname}/../commands/misc/*.{ts,js}`;

	public async getValueCurrency(moedaOrigem: string, moedaDestino: string): Promise<number|false> {
		const result = await this.axios.get(`https://economia.awesomeapi.com.br/all/${moedaOrigem}-${moedaDestino}`).then ((response: AxiosResponse) => {
			return parseFloat(response.data[moedaOrigem].ask).toFixed(2);
		}).catch ((error: Error) => {
			console.log(error);
			return false;
		});

		if(!result) return false;
		return result as unknown as number;
	}

}

export { ControllerMisc };