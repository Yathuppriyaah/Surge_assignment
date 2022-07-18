const mongoose = require('mongoose');

// note  Schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Note', noteSchema);
