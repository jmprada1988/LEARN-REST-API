const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  programs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Program'
    }
  ],
  role: {
    type: String,
    default: 'New User'
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
    default: 'Not Verified'
  },
  course_certificates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  program_certificates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Program'
    }
  ],
  verifyToken: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
