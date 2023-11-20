--1. Keys
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
FOREIGN KEY mentor REFERENCES authors(author_id);

--2. Relationships
CREATE TABLE IF NOT EXISTS research_papers (
  paper_id INT AUTO_INCREMENT PRIMARY KEY, 
  paper_title VARCHAR(50), 
  conference VARCHAR(50), 
  publish_date DATE
);

CREATE TABLE IF NOT EXISTS paperAuthor (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);

INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES 
  ('Author 1', 'University A', '1980-05-15', 25, 'm', 2),
  ('Author 2', 'University A', '1980-05-15', 35, 'm', 5),
  ('Author 3', 'University B', '1990-07-17', 30, 'f', 8),
  ('Author 4', 'University C', '1981-07-18', 20, 'f', 1),
  ('Author 5', 'University C', '1982-08-13', 22, 'm', 3),
  ('Author 6', 'University A', '1986-02-20', 20, 'm', 5),
  ('Author 7', 'University B', '1981-01-11', 26, 'm', 8),
  ('Author 8', 'University D', '1983-03-13', 30, 'f', 1),
  ('Author 9', 'University A', '1984-04-14', 35, 'f', 4),
  ('Author 10', 'University D', '1985-05-15', 35, 'f', 15),
  ('Author 11', 'University A', '1986-06-16', 30, 'm', 12),
  ('Author 12', 'University D', '1987-05-17', 20, 'm', 10),
  ('Author 13', 'University B', '1994-04-14', 22, 'm', 9),
  ('Author 14', 'University C', '1991-02-17', 20, 'm', 9),
  ('Author 15', 'University A', '1992-02-12', 25, 'm', 8);

INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
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

INSERT INTO paperAuthor (author_id, paper_id) VALUES
(1, 1), (1, 2),
(2, 3), (2, 4),
(4, 5), (4, 6),
(6, 7), (6, 8),
(7, 9), (7, 10),
(8, 11), (8, 12),
(9, 13), (9, 14),
(10, 15), (10, 16),
(11, 17), (11, 18),
(12, 19), (12, 20),
(13, 21), (13, 22),
(14, 23), (14, 24),(14, 25), (14, 26),
(15, 27), (15, 28),(15, 29), (15, 30);

--3. Joins
ALTER TABLE authors
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

--4. Aggregate Functions
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