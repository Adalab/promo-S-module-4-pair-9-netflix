const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema(
  {
    title: String,
    genre: String,
    image: String,
    category: String,
    date: String,
  },
  { collection: 'Movies' }
);
const Movies = mongoose.model('Movies', moviesSchema);
module.exports = Movies;
