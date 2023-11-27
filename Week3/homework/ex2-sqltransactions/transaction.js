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
    START TRANSACTION;

    UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
    UPDATE account SET balance = balance + 1000 WHERE account_number = 102;

    INSERT INTO account_changes (account_number, amount, changed_date, remark)
    VALUES
    (101, -1000.00, '2023-07-28', 'Withdrawal'),
    (102, 1000.00, '2023-07-28', 'Deposit')
    ;

    COMMIT;
  `;

  connection.query(queries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully', results);
    connection.end();
  });
});
