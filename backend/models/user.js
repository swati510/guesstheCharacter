const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  feeds: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Feed' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);