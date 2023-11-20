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
  UPDATE authors
  SET mentor = CASE
    WHEN author_id = 1 THEN 2
    WHEN author_id = 2 THEN 3
    WHEN author_id = 3 THEN 4
    WHEN author_id = 5 THEN 1
    WHEN author_id = 6 THEN 5
    WHEN author_id = 7 THEN 6
    WHEN author_id = 8 THEN 7
    ELSE mentor
  END
  WHERE author_id IN (1,2,3,5,6,7,8);
  
  SELECT author_name, mentor
  FROM authors;
  
  SELECT authors.*, research_papers.paper_title
  FROM authors
  LEFT JOIN paper_author ON authors.author_id = paper_author.author_id
  LEFT JOIN research_papers ON paper_author.paper_id = research_papers.paper_id;
   `;

  connection.query(sqlQueries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully');
    connection.end();
  });
});
