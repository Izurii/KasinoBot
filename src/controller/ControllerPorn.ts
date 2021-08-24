// import { IChanToken } from '../interfaces/ISankakuComplex';
import { Controller } from './Controller';

class ControllerPorn extends Controller {

	public commandsPath = `${__dirname}/../commands/porn/*.ts`;
	
	public axiosHeader = {
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0'
	};
	public proxyUrl = process.env.WEBSHARE_PROXY;

	// Sankaku Complex
	public sankakuComplexIdolBaseUrl = process.env.SANKAKU_COMPLEX_IDOL_BASE_URL as string;
	public sankakuComplexChanBaseUrl = process.env.SANKAKU_COMPLEX_CHAN_BASE_URL as string;
	
	// private sankakuComplexLogin = process.env.SANKAKU_COMPLEX_LOGIN as string;
	// private sankakuComplexPassword = process.env.SANKAKU_COMPLEX_PASSWORD as string;
	
	// Sankaku Complex - Chan
	
	// private static sankakuComplexChanLoginUrl = process.env.SANKAKU_COMPLEX_CHAN_LOGIN_URL as string;
	// public static sankakuComplexChanTokenHeader: string | false = false;

	// public async doLoginChan(): Promise<boolean> {
		
	// 	const params = new URLSearchParams();
	// 	params.append('url', '');
	// 	params.append('user[name]', this.sankakuComplexLogin);
	// 	params.append('user[password]', this.sankakuComplexPassword);
	// 	params.append('commit', 'Login');

	// 	const config = {
	// 		headers: {
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 			'Connection': 'keep-alive',
	// 			'Origin': 'https://chan.sankakucomplex.com',
	// 			'Referer': 'https://chan.sankakucomplex.com/user/login',
	// 			...this.axiosHeader
	// 		}
	// 	};

	// 	const response = await this.axios.post(ControllerPorn.sankakuComplexChanLoginUrl, params, config).catch(() => null);

	// 	if(response?.status == 200) {
	// 		ControllerPorn.sankakuComplexChanTokenHeader = response.headers['set-cookie'];
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}

	// }

	public async formatTagsForBooru(text: string): Promise<string> {
		const tags = text.substr(text.indexOf(' ') + 1).replace(' ', '+');
		return tags;
	}
	
}

export { ControllerPorn };