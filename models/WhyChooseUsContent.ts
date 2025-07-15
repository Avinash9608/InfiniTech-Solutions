
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IUspItem extends Document {
  title: string;
  description: string;
  icon: string; // Storing the icon name as a string
}

export interface IWhyChooseUsContent extends Document {
  uspItems: IUspItem[];
}

const UspItemSchema: Schema<IUspItem> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const WhyChooseUsContentSchema: Schema<IWhyChooseUsContent> = new Schema({
  uspItems: { type: [UspItemSchema], required: true },
}, { timestamps: true });

const WhyChooseUsContent: Model<IWhyChooseUsContent> = models.WhyChooseUsContent || mongoose.model<IWhyChooseUsContent>('WhyChooseUsContent', WhyChooseUsContentSchema);

export default WhyChooseUsContent;
