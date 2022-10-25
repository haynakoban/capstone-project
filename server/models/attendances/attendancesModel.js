const mongoose = require('mongoose');

const attendancesSchema = new mongoose.Schema({
  attendance_date: {
    type: String,
    required: true,
  },
  in_time: {
    type: Date,
    required: false,
  },
  out_time: {
    type: Date,
    required: false,
  },
  total_hours: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies',
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

module.exports = mongoose.model('Attendances', attendancesSchema);
