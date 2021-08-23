import { KBDatabase } from '../classes/KBDatabase';
import { KBGuild } from '../classes/KBGuild';
import { IEventGuildCreate } from '../interfaces/IEventGuildCreate';

export const run: IEventGuildCreate = async (client, guild) => {

	if(!guild) return;
	
	let guildObj = await KBGuild.loadByGuildID(guild.id);

	try {
		await (await KBDatabase.dbObj()).beginTransaction();
		if(!guildObj) {
			if(!(guildObj = await KBGuild.create(guild.id, guild.name) as KBGuild)) {
				return console.log('Error ocurred while creating a guild register.');
			}
			return console.log('Guild register created with success.');
		}
		else if(!await guildObj.modify(guild.name)) {
			return console.log('Error ocurred while update guild register');
		}
		
		await (await KBDatabase.dbObj()).commit();
		return console.log('Guild register updated with success.');

	}
	catch (err) {
		await (await KBDatabase.dbObj()).rollback();
		console.log(err);
	}

};