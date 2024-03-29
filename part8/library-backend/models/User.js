const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    minlength: 2
  }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)