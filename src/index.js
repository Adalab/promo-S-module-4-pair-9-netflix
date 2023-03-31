const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');

// create and config server
// app.use(cors());
// app.use(express.json());

// init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

let connection;

mysql
  .createConnection({
    host: 'localhost',
    database: 'Netflix',
    user: 'root',
    password: 'Cumple11041992!',
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

app.get('/movies', (req, res) => {
  console.log('Pidiendo a la base de datos información de películas.');
  connection
    .query('SELECT title FROM movies')
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
      });

      res.json(results);
    })
    .catch((err) => {
      throw err;
    });
});
