const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
  database: 'transactions',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const queries = `
    INSERT INTO account (balance)
    VALUES
    (15000.00),
    (11500.00),
    (13300.00);

    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES
    (100, 500.00, '2023-07-27', 'Deposit');
  `;

  connection.query(queries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully', results);
    connection.end();
  });
});
