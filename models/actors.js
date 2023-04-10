const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const actorsSchema = new Schema(
  {
    name: String,
    lastName: String,
    country: String,
    birthday: Date,
  },
  { collection: 'Actors' }
);
const Actors = mongoose.model('Actors', actorsSchema);
module.exports = Actors;
