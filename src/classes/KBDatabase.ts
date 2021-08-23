require('dotenv').config();
import mysql from 'mysql2/promise';
import { KBObject } from './KBObject';

class KBDatabase {

	private static _SQLDB = 'KasinoBot';
	private static _SQLPort = 3306;

	private static SQLObj: mysql.Connection;

	private constructor() {return;}

	public static async dbObj(): Promise<mysql.Connection> {
		if(!this.SQLObj) {
			this.SQLObj = await mysql.createConnection({
				host: 'localhost',
				user: 'kasino',
				database: this._SQLDB,
				password: process.env.MYSQL_PASSWORD,
				port: this._SQLPort
			});
		}
		return this.SQLObj;
	}

	public static async execute(query:string, values:Array<any>): Promise<Record<string, unknown>|boolean> {
		try {
			const result = await (await KBDatabase.dbObj()).execute(query, [...values]);
			return JSON.parse(JSON.stringify(result[0]));
		}
		catch (err) {
			return false;
		}
	}

}

export { KBDatabase };