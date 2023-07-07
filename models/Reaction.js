import { Schema } from 'mongoose';
import formatDate from '../utils/format-date.js';

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reactionSchema.virtual('createdAtFormatted').get(function () {
  return formatDate(this.createdAt);
});

export default reactionSchema;
