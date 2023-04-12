//incluir las constantes de express, cors, msql2.(app= como llamar al servidor)
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise');

//crear y configurar el servidor
app.use(cors());
app.use(express.json());

//conxion con la base de datos y colecciones con documentos = registros
const dbConnect = require('../config/connections');
dbConnect();
const Actors = require('../models/actors');
const Movies = require('../models/movies');
const Users = require('../models/users');
const Favorites = require('../models/favorites');

// iniciar el servidor que escucha en el puerto 4000
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//motor de plantillas
app.set('view engine', 'ejs');
let connection;

//conexión con la base de datos mysql  (relacional) Workbench
mysql
  .createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_Netflix',
    user: 'freedb_Pair 9',
    password: 'NSC7*47uS6%DBvq',
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(
          `Conexión establecida con la base de datos (identificador=${connection.threadId})`
        );
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

/*
app.get('/movies', (req, res) => {
  console.log('orden', req.query.sort);
  let genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    genreFilterParam = '%';
  }
  // petición a base de datos de tipo mysql
  connection
  //selecciona las columnas de la tabla Movies que coincidan con el género de la constante creada arriba y que ordene los títulos según el orden de la constante de arriba
    .query(
      `SELECT * FROM Movies WHERE genre LIKE ? ORDER BY title ${sortFilterParam}`,
      [genreFilterParam]
    )
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
      });

      res.json({
        success: true,
        movies: results,
      });
    })
    .catch((err) => {
      throw err;
    });
});*/

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  connection
    //email y password coincidan con la información del body
    .query(`SELECT * FROM Users WHERE email = ? AND password = ?`, [
      email,
      password,
    ])
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      console.log('resultados', results);
      if (results.length) {
        console.log('true');
        res.json({
          success: true,
          userId: results[0].idUser,
        });
      } else {
        console.log('false');
        res.json({
          success: false,
          errorMessage: 'Usuaria/o no encontrada/o',
        });
      }
    })
    .catch((err) => {
      throw err;
    });
});

// app.get('/movie/:movieId', (req, res) => {
//   console.log(req.params.movieId);
//   const sql = `SELECT * FROM Movies WHERE idMovies = ?`;
//   connection
//     .query(sql, [req.params.movieId])
//     .then(([results, fields]) => {
//       //console.log(results);
//       res.render('movie', results[0]);
//     })
//     .catch((err) => {
//       throw err;
//     });
// });

app.get('/movies_all_mongo', (req, res) => {
  const { genre, sort } = req.query;

  const query = genre ? { genre: genre } : {};

  Movies.find(query)
    .sort({ title: sort === 'asc' ? 1 : -1 })
    //ternario
    .then((docs) => {
      res.json({
        success: true,
        movies: docs,
      });
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

app.get('/movie/:movieId', (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  Movies.find({ _id: movieId })
    .then((docs) => {
      console.log(docs);
      res.render('movie', docs[0]);
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

app.post('/favorites-add', (req, res) => {
  let idMovie = '642d381f0b94d82287f2b72c';
  let idUser = '642d39010b94d82287f2b72f';
  const favorites = new Favorites({
    Users: idUser,
    Movies: idMovie,
    score: req.body.score,
  });
  favorites
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

app.get('/favorites-list/:user', (req, res) => {
  Favorites.find({
    Users: req.params.user,
  })
    .populate('Movies')
    .then((docs) => {
      res.json(docs);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(express.static('./src/public-react/'));
app.use(express.static('./src/public-movies-css'));
app.use(express.static('./src/public-movies-images'));
