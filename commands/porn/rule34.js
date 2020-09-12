const Controller = require('./pornController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.rule34 = rule34;

/**
 * @description Function that makes a GET request to rule34
 * @param { DiscordMessageType } message - Message that user sent to bot
 */
async function rule34 (message) {

	let tags = await Controller.formatTagsForBooru(message.content);
	let url_request = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags='+tags;
	let process_message = await message.channel.send("Pr0c3554nd0...");
	let request_rule34 = await Controller.axios.get(url_request)
	.then(response => {
		return response.data;
	})
	.catch(rej => {
		message.channel.send("tU d3rrub0u o 5erv1d0r c4c3t3");
	});

	if(request_rule34==undefined)
		return;

	xmlParse = Controller.utilFunctions.readXmlString(request_rule34)
	.then(async function (result) {
		let post_result = result.posts.post;

		if(post_result==undefined)
			return process_message.edit("N4o 4ch4m0s n4d4 c0l3g4.");

		let randomIndex = await Controller.utilFunctions.randomInt(0, (post_result.length+1));
		post_result = post_result[randomIndex];
		let image_url = post_result['$'].file_url;
		let score = post_result['$'].score;
		process_message.edit("``Rule34``\n``Score: " + score + "``\n"+image_url)
	}).catch(function(e){
		console.log(e);
		return process_message.edit("Ihhh d3u p4u no 515t3m4.");
	});

}