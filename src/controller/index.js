const server = new Map();
const queueContruct = {
	textChannel: 'dw',
	voiceChannel: 'dwa',
	connection: null,
	songs: [],
	volume: 0.5,
	playing: true,
	loop: false
};
server.set(12345678, queueContruct);
console.log(server.get(12345678));