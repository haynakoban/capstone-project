const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
  roomCode: {
    type: String,
    required: true,
  },
  showRoom: {
    type: Boolean,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: null,
  },
  members: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Companies', companiesSchema);
