CREATE DATABASE Netflix;
USE Netflix;
CREATE TABLE Movies(
idMovies INT auto_increment primary key not null,
title varchar(45) not null,
gender varchar(45) not null,
images varchar(1000) not null,
category varchar(45) not null,
year int 
);

CREATE TABLE Users(
idUser int auto_increment primary key,
user varchar(45) not null,
password varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null,
plan_details varchar(45) not null
);

CREATE TABLE Actors(
idActors int auto_increment primary key not null,
name varchar(45) not null,
lastName varchar(45) not null,
country varchar(45) not null,
birthday date
);

select * from Movies;
select * from Users;
select * from Actors;

INSERT INTO Movies(
title, gender, images, category, year
) VALUES 
("Pulp Fiction", "Crimen", "https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg", "Top 10", "1994"),
("La vita è bella", "Comedia", "https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg", "Top 10", "1996"), 
("Forrest Gump", "Comedia", "https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg", "Top 10", "1994");

INSERT INTO users (
user, password, name, email, plan_details
)VALUES 
("laura_dev", "laura", "Laura", "laura@gmail.com", "Standard"),
("maria_dev", "maria", "Maria", "maria@gmail.com", "Standard"), 
("ester_dev", "ester", "Ester", "ester@gmail.com", "Standard");

INSERT INTO Actors (
name, lastName, country, birthday
)VALUES 
("Tom", "Hanks", "Estados Unidos","1956-06-09"),
("Roberto", "Benigni", "Italia", "1952-10-27"), 
("John", "Travolta", "Estados Unidos", "1954-02-18");

SELECT title, gender FROM movies
WHERE year > 1990;

SELECT title FROM movies
WHERE category = "Top 10";

UPDATE movies
SET year = 1997
WHERE idMovies = 2;

SELECT * FROM actors;

SELECT name FROM actors
WHERE birthday BETWEEN '1950-01-01' and '1960-01-01';

SELECT name, lastName FROM actors
WHERE country  = "Estados Unidos";

SELECT user FROM users
WHERE plan_details = "Standard";

SELECT * FROM users;

DELETE FROM users
WHERE name LIKE 'M%';

CREATE TABLE rel_movies_users (
idMoviesUsers INT not null auto_increment primary key,
fk_movies INT,
fk_users INT
);

CREATE TABLE rel_movies_actors (
idMoviesActors INT not null auto_increment primary key,
fk_movies INT,
fk_actors INT
);

select * from rel_movies_actors;

INSERT INTO rel_movies_users(fk_movies, fk_users)
VALUES (1 , 1), (2 , 1), (2 , 2);

DELETE FROM rel_movies_users
WHERE idMoviesUsers >= 1;

INSERT INTO rel_movies_users(fk_movies, fk_users)
VALUES (1 , 1), (2 , 1), (3 , 2);

INSERT INTO rel_movies_actors (fk_actors, fk_movies ) VALUES (1, 3), (2, 2), (3, 1);

SELECT users.name, movies.title
FROM users, movies, rel_movies_users
WHERE rel_movies_users.fk_users = users.idUser and rel_movies_users.fk_movies = movies.idMovies;
