// login

const getMoviesFromApi = (params) => {
  //console.log('params', params);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  console.log(
    `http://localhost:4000/movies_all_mongo/${params.gender}/${params.sort}`
  );
  return fetch(
    `http://localhost:4000/movies_all_mongo/${params.gender}/${params.sort}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
