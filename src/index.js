const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

//create and config server
app.use(cors());
app.use(express.json());
const dbConnect = require('../config/connections');
dbConnect();
const Actors = require('../models/actors');
const Movies = require('../models/movies');
const Users = require('../models/users');
const Favorites = require('../models/favorites');

// init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
app.set('view engine', 'ejs');
let connection;

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

/*app.get('/movies', (req, res) => {
  console.log('orden', req.query.sort);
  let genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    genreFilterParam = '%';
  }
  connection
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
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  connection
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
  Movies.find({})
    .then((docs) => {
      console.log(docs);
      res.json({
        success: true,
        movies: docs,
      });
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

app.get('/movies_all_mongo/:genreValue/:sortValue', (req, res) => {
  const { genreValue } = req.params;
  const { sortValue } = req.params;
  const find = {};
  if (genreValue !== 'Todas') {
    find.genre = genreValue;
  }

  //console.log('holis', genreValue);
  //console.log('adios', sortValue);
  Movies.find(find)
    .sort({ title: sortValue === 'asc' ? 1 : -1 })

    .then((docs) => {
      //console.log(docs);
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

app.get('/find-movies', (req, res) => {
  Favorites.find({
    idMovie: ObjectId('643524e002cbf25a37ecd04d').then((docs) => {
      console.log(docs);
      res.json(docs);
    }),
  });
});

app.post('/favorites-add', (req, res) => {
  let idMovie = '642d381f0b94d82287f2b72c';
  let idUser = '642d39010b94d82287f2b72f';
  const favorites = new Favorites({
    idUser: idMovie,
    idMovie: idUser,
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

app.use(express.static('./src/public-react/'));
app.use(express.static('./src/public-movies-css'));
app.use(express.static('./src/public-movies-images'));
