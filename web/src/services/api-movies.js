// login
//Es la dirección que quieres que apunte tu endpoint y los parametros que le pasamos por query.(interpolar).
const getMoviesFromApi = (params) => {
  return fetch(
    `http://localhost:4000/movies_all_mongo?genre=${params.gender}&sort=${params.sort}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
