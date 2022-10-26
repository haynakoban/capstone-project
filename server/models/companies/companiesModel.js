const mongoose = require('mongoose');

const time = {
  isOn: {
    type: Boolean,
    required: true,
    default: false,
  },
  start_time: {
    type: Date,
    required: false,
  },
  end_time: {
    type: Date,
    required: false,
  },
};

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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: false,
    },
    roles: {
      type: String,
      required: false,
    },
  },
  request: {
    type: Array,
    default: [],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: false,
    },
    file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uploads',
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  pending: {
    type: Array,
    default: [],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: false,
  },
  time,
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
