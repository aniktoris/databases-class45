const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const queries = `
  DROP DATABASE IF EXISTS transactions;
  CREATE DATABASE transactions;
  USE transactions;

  CREATE TABLE account (
    account_number INT AUTO_INCREMENT PRIMARY KEY, 
    balance DECIMAL(15,2)
  ) AUTO_INCREMENT = 100;

  CREATE TABLE account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY, 
    account_number INT, 
    amount DECIMAL(15,2), 
    changed_date DATE, 
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES account(account_number)
  );

  `;

  connection.query(queries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully', results);
    connection.end();
  });
});
