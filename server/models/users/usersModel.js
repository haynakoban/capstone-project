const mongoose = require('mongoose');

const employeeInfo = {
  hasCompany: {
    type: Boolean,
    required: false,
    default: null,
  },
  companyInfo: {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
  },
  department: {
    type: String,
    required: false,
    default: null,
  },
  position: {
    type: String,
    required: false,
    default: null,
  },
};

const internInfo = {
  hasCompany: {
    type: Boolean,
    required: false,
    default: null,
  },
  companyInfo: {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
  },
  school: {
    type: String,
    required: false,
    default: null,
  },
  course: {
    type: String,
    required: false,
    default: null,
  },
  major: {
    type: String,
    required: false,
    default: null,
  },
  workingHours: {
    completed: {
      type: Number,
      required: false,
      default: 0,
    },
    remaining: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
    default: null,
  },
  age: {
    type: String,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  isIntern: {
    type: Boolean,
    required: true,
  },
  employeeInfo,
  internInfo,
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

module.exports = mongoose.model('Users', usersSchema);
