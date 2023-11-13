DROP DATABASE IF EXISTS meetup;
CREATE DATABASE meetup;
USE meetup;

CREATE TABLE IF NOT EXISTS Invitee (
          invitee_no INT AUTO_INCREMENT PRIMARY KEY,
          invitee_name VARCHAR(22) NOT NULL,
          invited_by VARCHAR(22) NOT NULL
      );

INSERT INTO Invitee (invitee_name, invited_by) 
VALUES
('Alice Johnson', 'Sarah Brown'),
('Michael Smith', 'Jonathan Miller'),
('Emily Davis', 'Olivia Clark'),
('Kevin Rodriguez', 'Chris White'),
('Sophia Lee', 'Jessica Turner');


CREATE TABLE IF NOT EXISTS Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(22) NOT NULL,
        floor_number INT NOT NULL
    ) AUTO_INCREMENT = 101;

INSERT INTO Room (room_name, floor_number) 
VALUES
('Orange', 2),
('Purple', 2),
('Black', 3),
('Green', 3),
('Blue', 4);


CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(22) NOT NULL,
      starting_time VARCHAR(22) NOT NULL,
      ending_time VARCHAR(22) NOT NULL,
      room_no INT,
      FOREIGN KEY room_no REFERENCES Room(room_no)
  );

INSERT INTO Meeting (meeting_title, starting_time, ending_time)
VALUES 
('Project Kickoff', '2023-01-01 08:00', '2023-01-01 10:00', 101),
('Team Meeting', '2023-02-02 09:00', '2023-02-02 10:00', 102),
('Planning Session', '2023-02-03 10:00', '2023-02-03 11:00', 103),
('Training Workshop', '2023-02-04 12:00', '2023-02-04 13:00', 104),
('Board Meeting', '2023-02-05 13:00', '2023-02-05 14:00', 105);