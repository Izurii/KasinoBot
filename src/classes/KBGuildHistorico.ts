import { IKBGuildHistorico } from '../interfaces/IKBGuildHistorico';
import { KBDatabase } from './KBDatabase';
import { KBObject } from './KBObject';

class KBGuildHistorico extends KBObject {

	public STATUS_ATIVO = 1;
	public STATUS_INATIVO = 0;

	public constructor() {
		super();
	}

	public static async loadByID(id: number, fields = '*'): Promise<IKBGuildHistorico> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuildHistorico
		WHERE KBGuildHistoricoID = ${id}
		`, [id, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as IKBGuildHistorico;
	}

	public static async loadByGuildID(guildId: number, fields = '*'): Promise<IKBGuildHistorico> {
		let data;
		if(!(data = await KBDatabase.execute(`
		SELECT ${fields} FROM KBGuildHistorico
		WHERE KBGGuildID = ${guildId}
		`, [guildId, fields]))) {
			throw KBObject.ERROR_UNKNOW;
		}
		return this.loadWithData(data) as IKBGuildHistorico;
	}
	
}

export { KBGuildHistorico };