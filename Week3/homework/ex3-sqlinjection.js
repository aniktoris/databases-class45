const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
  database: 'new_world',
});

// function getPopulation(Country, name, code, cb) {
//   conn.query(
//     `SELECT Population FROM ${Country} WHERE Name = '${name}' and Code = '${code}'`,
//     function (err, result) {
//       if (err) cb(err);
//       if (result.length == 0) cb(new Error('Not found'));
//       cb(null, result[0].name);

//       console.log('SQL statements executed successfully', result);
//       conn.end();
//     },
//   );
// }

function getPopulation(Country, name, code, cb) {
  const sql = `SELECT Population FROM ${Country} WHERE Name = ? and Code = ?`;
  const injects = [name, code];
  const formattedSql = mysql.format(sql, injects);

  conn.query(formattedSql, function (err, result) {
    if (err) cb(err);
    if (result.length == 0) cb(new Error('Not found'));
    cb(null, result[0].name);

    console.log('SQL statements executed successfully', result);
    conn.end();
  });
}

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Give an example of a value that can be passed
// as name and code that would take advantage of SQL-injection and ( fetch all the records in the database)
getPopulation('country', "'' or 1=1", "'' or 1=1", (err, data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Population:', data);
  }
});
