import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  projectDetails: string;
  replied: boolean;
  createdAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
  },
  projectDetails: {
    type: String,
    required: [true, 'Please provide your project details.'],
  },
  replied: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> = models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
