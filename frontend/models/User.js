import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    website: String,
  },
  workExperience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      current: Boolean,
      description: String,
      responsibilities: [String],
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      graduationDate: Date,
      gpa: String,
      achievements: [String],
    },
  ],
  skills: [String],
  achievements: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
