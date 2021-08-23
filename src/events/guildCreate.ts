import { KBDatabase } from '../classes/KBDatabase';
import { KBGuild } from '../classes/KBGuild';
import { IEventGuildCreate } from '../interfaces/IEventGuildCreate';

export const run: IEventGuildCreate = async (client, guild) => {

	if(!guild) return;
	
	const guildObj = await KBGuild.loadByGuildID(guild.id);

	try {
		
		await (await KBDatabase.dbObj()).beginTransaction();
		if(!guildObj) {
			if(!await KBGuild.create(guild.id, guild.name)) {
				throw 'Error ocurred while creating a guild register.';
			}
			console.log('Guild register created with success.');
		} else if(guildObj instanceof KBGuild) {
			if(!await guildObj.modify(guild.name)) {
				throw 'Error ocurred while update guild register';
			}
			console.log('Guild register updated with success.');
		}
		
		await (await KBDatabase.dbObj()).commit();

	} catch (err) {
		await (await KBDatabase.dbObj()).rollback();
		console.log(err);
	}

};