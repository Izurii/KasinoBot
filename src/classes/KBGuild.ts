import { IKBGuild } from '../interfaces/IKBGuild';
import { KBDatabase } from './KBDatabase';
import { KBObject } from './KBObject';

class KBGuild extends KBObject {

	public STATUS_ATIVO = 1;
	public STATUS_INATIVO = 0;
	public data!: IKBGuild['data'];

	public constructor() {
		super();
	}

	public static async loadByID(id: number, fields = '*'): Promise<KBGuild> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuild
		WHERE KBGuildID = ${id}
		`, [id, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as KBGuild;
	}

	public static async loadByGuildID(guildId: string, fields = '*'): Promise<KBGuild> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuild
		WHERE KBGGuildID = ${guildId}
		`, [guildId, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as KBGuild;
	}
	
	public static async create(guildId: string, guildName: string): Promise<KBGuild|false> {

		const sql = await KBDatabase.execute(`
			INSERT INTO KBGuild
			(KBGGuildID, KBGName)
			VALUES (?,?)
		`, [guildId, guildName]);

		if(!sql) return false;

		return this.loadByGuildID(guildId);
	}

	public async modify(guildName: string): Promise<KBGuild|false> {
		
		const sql = await KBDatabase.execute(`
			UPDATE KBGuild 
			SET KBGName = ?
			WHERE KBGuildID = ?
		`, [guildName, this.data?.KBGuildID]);
		
		if(!sql) return false;

		return KBGuild.loadByGuildID(this.data.KBGGuildID);
	}

}

export { KBGuild };