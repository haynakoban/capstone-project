const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Uploads',
    required: false,
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

module.exports = mongoose.model('Posts', postsSchema);
