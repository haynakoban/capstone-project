const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  report_date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  log: {
    type: String,
    required: true,
  },
  ip_address: {
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

module.exports = mongoose.model('Logs', logsSchema);
