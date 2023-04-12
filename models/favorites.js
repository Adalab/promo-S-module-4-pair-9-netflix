const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoritesSchema = new Schema(
  {
    Users: { type: Schema.Types.ObjectId, ref: 'Users' },
    Movies: { type: Schema.Types.ObjectId, ref: 'Movies' },
    score: Number,
  },
  { collection: 'favorites' }
);
const Favorites = mongoose.model('favorites', favoritesSchema);
module.exports = Favorites;
