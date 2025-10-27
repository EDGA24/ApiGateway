import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);