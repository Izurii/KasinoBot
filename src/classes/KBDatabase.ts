import mysql from 'mysql2/promise';

class KBDatabase {

	private static _SQLDB = 'KasinoBot';
	private static _SQLPort = 3306;

	private static SQLObj: mysql.Pool;

	private constructor() {return;}

	public static async dbObj(): Promise<mysql.Pool> {
		if(!this.SQLObj) {
			this.SQLObj = await mysql.createPool({
				host: 'localhost',
				user: 'kasino',
				database: this._SQLDB,
				password: process.env.MYSQL_PASSWORD,
				port: this._SQLPort,
				connectionLimit: 0,
				queueLimit: 0
			});
		}
		return this.SQLObj;
	}

	public static async execute(query:string, values:Array<any>): Promise<Record<string, unknown>|boolean> {
		try {
			const result = await (await KBDatabase.dbObj()).execute(query, [...values]);
			return JSON.parse(JSON.stringify(result[0]));
		} catch (err) {
			const error: mysql.QueryError = err;
			console.log(error);
			return false;
		}
	}

}

export { KBDatabase };