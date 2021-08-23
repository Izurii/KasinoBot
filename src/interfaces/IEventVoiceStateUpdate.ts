import { VoiceState } from 'discord.js';

export interface IEventVoiceStateUpdate {
	(oldState: VoiceState, newState: VoiceState): Promise<void>
}