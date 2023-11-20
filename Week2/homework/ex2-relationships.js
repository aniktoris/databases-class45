const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
  database: 'authors',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const sqlQueries = `
  CREATE TABLE IF NOT EXISTS research_Papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY, 
    paper_title VARCHAR(50), 
    conference VARCHAR(50), 
    publish_date DATE
  );
  
  CREATE TABLE IF NOT EXISTS paper_author (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  );
  
  INSERT IGNORE INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES 
  ('Author 1', 'University A', '1980-05-15', 25, 'm', NULL),
  ('Author 2', 'University A', '1980-05-15', 20, 'm', NULL),
  ('Author 3', 'University B', '1990-07-17', 15, 'f', NULL),
  ('Author 4', 'University C', '1981-07-18', 35, 'f', NULL),
  ('Author 5', 'University C', '1982-08-13', 14, 'm', NULL),
  ('Author 6', 'University A', '1986-02-20', 24, 'm', NULL),
  ('Author 7', 'University B', '1981-01-11', 24, 'm', NULL),
  ('Author 8', 'University D', '1983-03-13', 16, 'f', NULL),
  ('Author 9', 'University A', '1984-04-14', 16, 'f', NULL),
  ('Author 10', 'University D', '1985-05-15', 30, 'f', NULL),
  ('Author 11', 'University A', '1986-06-16', 32, 'm', NULL),
  ('Author 12', 'University D', '1987-05-17', 32, 'm', NULL),
  ('Author 13', 'University B', '1994-04-14', 30, 'm', NULL),
  ('Author 14', 'University C', '1991-02-17', 35, 'm', NULL),
  ('Author 15', 'University A', '1992-02-12', 25, 'm', NULL);
  
  INSERT IGNORE INTO research_papers (paper_title, conference, publish_date)  VALUES
  ('Paper 1', 'Conference X', '2022-01-10'),
  ('Paper 2', 'Conference Y', '2022-02-10'),
  ('Paper 3', 'Conference W', '2022-01-20'),
  ('Paper 4', 'Conference W', '2022-03-10'),
  ('Paper 5', 'Conference X', '2023-01-30'),
  ('Paper 6', 'Conference X', '2022-04-10'),
  ('Paper 7', 'Conference Y', '2022-01-04'),
  ('Paper 8', 'Conference Y', '2023-05-10'),
  ('Paper 9', 'Conference W', '2022-01-15'),
  ('Paper 10', 'Conference W', '2022-06-10'),
  ('Paper 11', 'Conference Y', '2022-01-16'),
  ('Paper 12', 'Conference W', '2022-07-10'),
  ('Paper 13', 'Conference Y', '2022-01-17'),
  ('Paper 14', 'Conference X', '2022-08-10'),
  ('Paper 15', 'Conference Y', '2022-01-18'),
  ('Paper 16', 'Conference Y', '2023-09-10'),
  ('Paper 17', 'Conference Y', '2022-01-19'),
  ('Paper 18', 'Conference W', '2022-11-10'),
  ('Paper 19', 'Conference X', '2023-01-20'),
  ('Paper 20', 'Conference K', '2022-12-10'),
  ('Paper 21', 'Conference K', '2022-01-12'),
  ('Paper 22', 'Conference K', '2022-01-11'),
  ('Paper 23', 'Conference P', '2022-01-12'),
  ('Paper 24', 'Conference P', '2023-02-20'),
  ('Paper 25', 'Conference P', '2022-03-30'),
  ('Paper 26', 'Conference L', '2023-01-14'),
  ('Paper 27', 'Conference L', '2022-01-15'),
  ('Paper 28', 'Conference L', '2023-01-16'),
  ('Paper 29', 'Conference L', '2023-02-17'),
  ('Paper 30', 'Conference L', '2022-03-18');
  
  INSERT INTO paper_author (author_id, paper_id) VALUES
  (1, 1), (1, 2),
  (2, 1), (2, 3), (2, 4),
  (4, 5), (4, 6),
  (6, 5), (6, 7), (6, 8),
  (7, 5), (7, 9), (7, 10),
  (8, 11), (8, 12),
  (9, 13), (9, 14), (9, 21),
  (10, 15), (10, 16), (10, 14),
  (11, 17), (11, 18), (11, 14),
  (12, 19), (12, 20), (12, 21),
  (13, 21), (13, 22),
  (14, 23), (14, 24), (14, 25), (14, 26),
  (15, 27), (15, 28),(15, 29), (15, 30);  
   `;

  connection.query(sqlQueries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully');
    connection.end();
  });
});
