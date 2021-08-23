import { getVoiceConnection } from '@discordjs/voice';
import { IEventVoiceStateUpdate } from '../interfaces/IEventVoiceStateUpdate';

export const run: IEventVoiceStateUpdate = async (oldState, newState) => {
	// if(newState.selfDeaf) {
	// 	const connection = getVoiceConnection(newState.guild.id);
	// 	connection?.destroy();
	// }
};