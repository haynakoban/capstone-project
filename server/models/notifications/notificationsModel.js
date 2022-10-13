const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  recipient: {
    type: Array,
    default: [],
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: true,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
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
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
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

module.exports = mongoose.model('Notifications', notificationsSchema);
