const Controller = require('./pornController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.idol = idol;

/**
 * @description Function that executes a python script that get images from the SakuraComplex booru IDOL
 * @param  { DiscordMessageType } message
 */
async function idol(message) {

	let tags = await Controller.formatTagsForBooru(message.content);
	if(tags.length==0)
		tags = '';

	var options = {
		args: [tags, message.guild.id]
	};

	let processMessage = await message.channel.send("Pr0c3554nd0...");
	let processMessageID = processMessage.id;
	Controller.pythonShell.run(Controller.pathToIdolScript, options, function (err, results) {
		if (err) { console.log(err); return processMessage.edit("Ihhh d3u p4u no 515t3m4."); };
		sendImage(results);
	});

	async function sendImage(results) {

		let processedResult = results[0].split(" ");

		if(processedResult[0].startsWith('Skipping')) {
			console.log(processedResult)
			return processMessage.edit("Ihhh d3u p4u no 515t3m4.");
		} else if(processedResult[0].startsWith('nothing')) {
			return processMessage.edit("N4o 4ch4m0s n4d4 c0l3g4.");
		} else if(processedResult[0].startsWith('tempts')) {
			return processMessage.edit("Vishhh já foram tr35 tentativas");
		}

		filename = processedResult[0];
		let path = "./images/" + message.guild.id + "/" + filename;
		if (Controller.fs.existsSync(path)) {

			Controller.utilFunctions.deleteMessage(message.channel, processMessageID);
			message.channel.send(
				"``IDOL-SankakuComplex``\n``Score: " + processedResult[1] + "``",
				{ files: [path] }
			).then(Controller.fs.remove(path));

		} else {
			processMessage.edit("Ihhh br0h foi mal mas deu pau na máquina.");
		}
		
	}
	
}