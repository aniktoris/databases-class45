const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw error;
  console.log('Connected to MySQL');

  const selectQueries = `SELECT Name, Population FROM country 
  WHERE Population > 8000000;

  SELECT Name FROM country 
  WHERE Name LIKE '%land%';
  
  SELECT Name, Population FROM country 
  WHERE Population BETWEEN 500000 AND 1000000;

  SELECT Name, Continent FROM country 
  WHERE Continent = 'Europe';

  SELECT Name, SurfaceArea FROM country 
  ORDER BY SurfaceArea DESC;

  SELECT Name, CountryCode FROM city 
  WHERE CountryCode = 'NLD';

  SELECT Name, Population FROM city 
  WHERE Name = 'Rotterdam';

  SELECT Name, SurfaceArea FROM country 
  ORDER BY SurfaceArea DESC LIMIT 10;

  SELECT Name, Population FROM city 
  ORDER BY Population DESC LIMIT 10;

  SELECT SUM(Population) AS TotalPopulation FROM country;
  `;

  connection.query(selectQueries, (error, results, fields) => {
    if (error) throw error;
    console.log('SQL queries executed successfully', results);
    connection.end();
  });
});
