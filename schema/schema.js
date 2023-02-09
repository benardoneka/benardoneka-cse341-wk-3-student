const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a Mongoose schema for the user model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String
});

UserSchema.index({ googleId: 1 }); // add index on the googleId field
// // Create a Mongoose model for the user
const User = mongoose.model('User', UserSchema);

// // Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
// module.exports = User
