const mongoose = require('mongoose');

const submittedTasksSchema = new mongoose.Schema({
  files: {
    type: Array,
    default: [],
    ref: 'Uploads',
    required: false,
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

module.exports = mongoose.model('Tasks.submitted', submittedTasksSchema);
