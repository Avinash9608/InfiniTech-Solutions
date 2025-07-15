
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface ISlide extends Document {
  image: string;
  text: string;
  dataAiHint?: string;
}

export interface IHeroContent extends Document {
  taglines: string[];
  slides: ISlide[];
}

const SlideSchema: Schema<ISlide> = new Schema({
  image: { type: String, required: true },
  text: { type: String, required: true },
  dataAiHint: { type: String },
});

const HeroContentSchema: Schema<IHeroContent> = new Schema({
  taglines: { type: [String], required: true },
  slides: { type: [SlideSchema], required: true },
}, { timestamps: true });

const HeroContent: Model<IHeroContent> = models.HeroContent || mongoose.model<IHeroContent>('HeroContent', HeroContentSchema);

export default HeroContent;
