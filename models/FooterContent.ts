
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IQuickLink extends Document {
  label: string;
  href: string;
}

export interface ISocialLink extends Document {
  label: string;
  href: string;
}

export interface IFooterContent extends Document {
  companyName: string;
  companyDescription: string;
  quickLinks: IQuickLink[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: ISocialLink[];
}

const QuickLinkSchema: Schema<IQuickLink> = new Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
});

const SocialLinkSchema: Schema<ISocialLink> = new Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
});

const FooterContentSchema: Schema<IFooterContent> = new Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String, required: true },
  quickLinks: { type: [QuickLinkSchema], required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  socialLinks: { type: [SocialLinkSchema], required: true },
}, { timestamps: true });

const FooterContent: Model<IFooterContent> = models.FooterContent || mongoose.model<IFooterContent>('FooterContent', FooterContentSchema);

export default FooterContent;
