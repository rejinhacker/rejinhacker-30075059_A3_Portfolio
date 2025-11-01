const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  live: {
    type: String,
    required: true
  },
  tech: [{
    type: String,
    required: true
  }],
  gradient: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);