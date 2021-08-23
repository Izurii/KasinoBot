import { IKBGuild } from '../interfaces/IKBGuild';
import { KBDatabase } from './KBDatabase';
import { KBObject } from './KBObject';

class KBGuild extends KBObject {

	public STATUS_ATIVO = 1;
	public STATUS_INATIVO = 0;

	public constructor() {
		super();
	}

	public static async loadByID(id: number, fields = '*'): Promise<IKBGuild> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuild
		WHERE KBGuildID = ${id}
		`, [id, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as IKBGuild;
	}

	public static async loadByGuildID(guildId: number, fields = '*'): Promise<IKBGuild> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuild
		WHERE KBGGuildID = ${guildId}
		`, [guildId, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as IKBGuild;
	}
	
}

export { KBGuild };