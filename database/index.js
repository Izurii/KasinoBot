const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'H#T&Ph%e7n-dw.;=-/3#@Y&O#*FH$IO&GTI',
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
 * @returns { Object } - Returns a object containing the result of the query or a error in case.
 */
async function query(query) {
	return new Promise((resolve, reject) => {
		connection.query(query, (err, result) => {
			return err ? reject(err) : resolve(result[0]);
		});
	});
}

exports.query = query;