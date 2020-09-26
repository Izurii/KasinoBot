const Controller = require('./memeController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;

exports.magik = magik;
/**
 * @description Function that executes a python script named 'magik' that is on scripts folder, the script distort images or gifs 
 * @param  { DiscordMessageType } message
 */
async function magik(message) {

	const split = message.content.split(" "); split.shift();
	const args = split.join("").trim();

	var scale = parseInt(args);
	let image = [];

	if(!Number.isInteger(scale))
		scale = 1;

	if (scale > 10)
		return message.channel.send("O máximo é 10 carai, vai com calma.");

	let lastMessages = await Controller.utilFunctions.fetchMessages(message.channel, 20);
	lastMessages.forEach(function (item, index) {
		if (item[1].embeds.length > 0 || item[1].attachments.size > 0) {
			if (item[1].embeds.length > 0)
				image = item[1].embeds;
			else
				image = item[1].attachments;
			return true;
		}
	});

	let imageUrl;
	if (image.length == 1) {
		imageUrl = image[0].thumbnail.url;
	} else if (image.size > 0) {
		let array = Array.from(image);
		array = Array.from(array[0]);
		imageUrl = array[1].url;
	} else {
		return message.channel.send("N40 4ch4m05 1m4g3m5.");
	}

	let processMessage = await message.channel.send("Pr0c3554nd0 0 m0n5tr0...");
	let processMessageID = processMessage.id;

	var options = {
		mode: 'text',
		pythonOptions: ['-u'],
		args: [scale, imageUrl, message.guild.id]
	};

	let fileName = Controller.pythonShell.run(Controller.pathToMagikScript, options, function (err, result) {
		if (err) { console.log(err); return false; };

		if(result[0].startsWith('error_request')) {
			return processMessage.edit(errorMessage+'0');
		} else if(result[0].startsWith('gmagik')) {
			return processMessage.edit(errorMessage+'1');
		} else if(result[0].startsWith('error_wand')) {
			return processMessage.edit(errorMessage+'2');
		} else if(result[0].startsWith('ffmpeg_error')) {
			return processMessage.edit(errorMessage+'3');
		} else if(result[0].startsWith('extension')) {
			return processMessage.edit("3553 f0rm4t0 n40 3 p3rm1t1d0");
		} else {
			sendImage(('%j', result));
		}
	});

	let errorMessage = "Ihhh br0h foi mal mas deu pau na máquina.";

	if (!fileName) {
		Controller.utilFunctions.editMessage(
			message.channel,
			processMessageID,
			errorMessage
		);
		return;
	}

	async function sendImage(result) {

		let path = "./images/" + message.guild.id + "/" + result;
		if (Controller.fs.existsSync(path)) {
			Controller.utilFunctions.deleteMessage(message.channel, processMessageID);
			message.channel.send("``Scale: " + scale + "``", { files: [path] }).then(Controller.fs.remove(path));
		} else {
			Controller.utilFunctions.editMessage(
				message.channel,
				processMessageID,
				errorMessage
			);
		}
	}
}