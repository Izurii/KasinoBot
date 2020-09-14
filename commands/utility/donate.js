const Controller = require('./utilityController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.donate = donate;

/**
 * @description Function that returns a message with links to donate
 * @param { DiscordMessageType } message - Message that user sent to bot
 * @returns Embed message
*/
async function donate(message) {

	const embed = {
		"title": "Doação para o bot Kasino se manter vivo",
		"color": 16720896,
		"footer": {
		  "text": "Assinado, Heitor."
		},
		"thumbnail": {
		  "url": "https://cdn.discordapp.com/attachments/514299610366345216/755114165718352063/logo.png"
		},
		"image": {
		  "url": "https://cdn.discordapp.com/attachments/648016758346612759/755113932821102662/1452367820_large_1.gif"
		},
		"author": {
		  "name": "Izurii Hootoh - Dono do KASINÃO",
		  "icon_url": "https://images-ext-1.discordapp.net/external/uLTLo54TWz5xVGtDLJI_RCvyHhKi4DcGami8g_dB5YA/%3Fsize%3D256/https/cdn.discordapp.com/avatars/229096474762280960/1088ddf9ad0ad2f9ec4720e6f3cf3326.png"
		},
		"fields": [
		  {
			"name": "Por hora o dono gasta em torno de ~R$35 reais ao mês para manter o Kasino vivo, se puderem ajudar com algo, o Kasino agradece.",
			"value": "Você pode doar pelo PagSeguro ou pelo PayPal, cartão de crédito e o cacete a 4. Caso queira também pode fazer assinatura e pagar todo mês sem se preocupar."
		  },
		  {
			"name": "Explicação por cima dos gastos",
			"value": "Esse custo vem de servidor (AWS)+Proxys que preciso utilizar para que ele funcione corretamente."
		  },
		  {
			"name": "PayPal",
			"value": "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GYEJ3388PSG9E&source=url",
			"inline": true
		  },
		  {
			"name": "PagSeguro",
			"value": "https://pag.ae/7Wba24YTP",
			"inline": true
		  }
		]
	  };
	  return message.channel.send({embed});
}