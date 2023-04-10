const mongoose = require('mongoose');

const dbConnect = () => {
  const user = 'marinacaro92';
  const pass = 'Uj8ro5APjhq29TjA';
  const dbName = 'Netflix';

  const uri = `mongodb+srv://${user}:${pass}@cluster2.fr84jek.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;
