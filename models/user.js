const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      max: 40
    },
    description: {
      type: String
    },
    age: {
      type: Number
    }
  },
    { timestamps: true }
  );

  module.exports = mongoose.model('User', userSchema);