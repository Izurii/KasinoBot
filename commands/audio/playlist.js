const Controller = require('./audioController');
const DiscordMessageType = Controller.JSDocTypes.DiscordMessageType;
exports.playlist = playlist;

/**
 * @description Function that search playlists on YouTube
 * @param { DiscordMessageType } message - Message that user sent to bot
 */
async function playlist (message) {

	let searchTerm = message.content.split(" ");
	searchTerm = searchTerm[1];
	
	Controller.ytsr.getFilters(searchTerm, (err, filters) => {
		if(err) throw err;
		filter = filters.get('Type').find(o => o.name === 'Playlist');
		Controller.ytsr.getFilters(filter.ref, (err, filters) => { 

			if(err) throw err;
			var options = { limit: 5, nextpageRef: filter.ref, safeSearch: false };

			Controller.ytsr(null, options, async function(err, result) {
				console.log(result);
			});
		});
	});
}