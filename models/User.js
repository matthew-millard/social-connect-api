import mongoose, { Schema, model } from 'mongoose';
import validateEmail from '../utils/validate-email.js';

// Define User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: validateEmail,
    unique: true,
  },
  thoughts: [
    {
      ref: 'Thought',
      type: Schema.Types.ObjectId,
    },
  ],
  friends: [
    {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  ],
});

// Define friendCount Virtual
userSchema.virtual('friendCount').get(function () {
  const friendCount = this.friends.length;
  return friendCount;
});

// Include virtuals when document is requested in JSON format
userSchema.set('toJSON', { virtuals: true });

// Compile and export User model
const User = mongoose.model('User', userSchema);

export default User;
