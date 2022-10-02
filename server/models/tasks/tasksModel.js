const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ref_files: {
    type: Array,
    default: [],
    ref: 'Uploads',
    required: false,
  },
  submitted_file: {
    type: Array,
    default: [],
    files: {
      type: Array,
      default: [],
      file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uploads',
        required: false,
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  assignedTo: {
    type: Array,
    default: [],
    ref: 'Users',
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies',
    required: true,
  },
  date: {
    due: {
      type: Date,
      default: () => Date.now(),
    },
    closes: {
      type: Date,
      default: () => Date.now(),
    },
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

module.exports = mongoose.model('Tasks', tasksSchema);
