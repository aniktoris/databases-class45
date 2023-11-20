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

  const sqlQueries = `DROP DATABASE IF EXISTS authors;
  CREATE DATABASE authors;
  USE authors;

  CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY, 
    author_name VARCHAR(50), 
    university VARCHAR(50), 
    date_of_birth DATE, 
    h_index INT, 
    gender CHAR(1)
    );
  
  ALTER TABLE authors
  ADD COLUMN mentor INT;

  ALTER TABLE authors
  ADD CONSTRAINT fk_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_id);
   `;

  connection.query(sqlQueries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully');
    connection.end();
  });
});
