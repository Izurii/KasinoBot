const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PASSWORD,
  database: 'KasinoBot'
});

connection.connect(function(err) {
	if (err) {
		console.error('Error connecting: ' + err.stack);
		return;
	}
	console.log('MySQL OK!');
});

const MysqlQueryType = connection.query;
/**
 * @description Function that execute a promise based query on a mysql db
 * @param { MysqlQueryType } query 
 * @returns Returns a object containing the result of the query or a error in case.
 */
async function query(query) {
	return new Promise((resolve, reject) => {
		connection.query(query, (err, result) => {
			return err ? reject(err) : resolve(result[0]);
		});
	});
}

exports.query = query;
