const mongoose = require('mongoose');

const employeeInfo = {
  listOfCompanies: {
    type: Array,
    required: false,
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
  },
  company: {
    name: {
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
  },
};

const internInfo = {
  companyInfo: {
    hasCompany: {
      type: Boolean,
      default: false,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
  },
  school: {
    name: {
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
  pending: {
    type: Array,
    default: [],
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
    company_name: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  offers: {
    type: Array,
    default: [],
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Companies',
      required: false,
    },
    company_name: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
};

const docs = {
  resume: {
    file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uploads',
      required: false,
    },
    file_name: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  cv: {
    file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uploads',
      required: false,
    },
    file_name: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  letter: {
    file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uploads',
      required: false,
    },
    file_name: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
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
    required: false,
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
