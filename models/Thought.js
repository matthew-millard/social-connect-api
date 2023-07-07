import mongoose, { Schema, model } from 'mongoose';
import formatDate from '../utils/format-date.js';

// Define Thought schema
const thoughtSchema = Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      ref: 'Reaction',
      type: Schema.Types.ObjectId,
    },
  ],
});

// Format the timestamp on query
thoughtSchema.virtual('createdAtFormatted').get(function () {
  return formatDate(this.createdAt);
});

// Calculate reactionCount on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Include virtuals when document is requested in JSON format
thoughtSchema.set('toJSON', { virtuals: true });

const Thought = mongoose.model('Thought', thoughtSchema);

export default Thought;
