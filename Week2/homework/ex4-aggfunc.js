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
  SELECT research_papers.paper_title, COUNT(paper_author.author_id) AS author_no
  FROM research_papers
  JOIN paper_author 
  ON research_papers.paper_id = paper_author.paper_id
  GROUP BY paper_author.paper_id;

  SELECT COUNT(authors.gender) AS female_no
  FROM authors
  JOIN paper_author
  ON authors.author_id = paper_author.author_id
  WHERE authors.gender = 'f';

  SELECT authors.university, ROUND(AVG(authors.h_index)) AS index_avg
  FROM authors
  GROUP BY authors.university;

  SELECT authors.university, COUNT(paper_author.paper_id) AS paper_no
  FROM authors
  JOIN paper_author
  ON authors.author_id = paper_author.author_id
  GROUP BY authors.university;

  SELECT authors.university, MIN(authors.h_index) AS index_min, MAX(authors.h_index) AS index_max
  FROM authors
  GROUP BY authors.university;
   `;

  connection.query(sqlQueries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL statements executed successfully');
    connection.end();
  });
});
