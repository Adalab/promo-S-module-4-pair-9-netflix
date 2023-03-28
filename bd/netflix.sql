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

INSERT INTO Movies(title, gender, images, category, year) VALUES ("Pulp Fiction", "Crimen", "https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg", "Top 10", "1994"),("La vita è bella", "Comedia", "https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg", "Top 10", "1996"), ("Forrest Gump", "Comedia", "https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg", "Top 10", "1994")
