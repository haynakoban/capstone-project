const mongoose = require('mongoose');

const employeeInfo = {
  listOfCompanies: {
    type: Array,
    required: false,
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
  companyName: {
    type: String,
    required: false,
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
  schoolName: {
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
    },
    remaining: {
      type: Number,
      required: false,
    },
  },
};

const docs = {
  resume: {
    type: String,
    required: false,
  },
  cv: {
    type: String,
    required: false,
  },
  letter: {
    type: String,
    required: false,
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
  icon: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isIntern: {
    type: Boolean,
    required: true,
  },
  employeeInfo,
  internInfo,
  docs,
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
