const mongoose = require('mongoose');

const employeeInfo = {
  hasCompany: {
    type: Boolean,
    required: false,
    default: false,
  },
  listOfCompanies: {
    type: Array,
    required: false,
  },
  companyInfo: {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  department: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
};

const internInfo = {
  hasCompany: {
    type: Boolean,
    required: false,
    default: false,
  },
  companyInfo: {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  school: {
    type: String,
    required: false,
  },
  course: {
    type: String,
    required: false,
  },
  major: {
    type: String,
    required: false,
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
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
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
