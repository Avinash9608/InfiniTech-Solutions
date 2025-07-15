
import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Interface for a single navigation link
export interface INavLink extends Document {
  label: string;
  href: string;
}

// Interface for the Header content document
export interface IHeaderContent extends Document {
  logoText: string;
  navLinks: INavLink[];
  serviceLinks: INavLink[];
  ctaButton: {
    label: string;
    href: string;
  };
}

const NavLinkSchema: Schema<INavLink> = new Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
});

const HeaderContentSchema: Schema<IHeaderContent> = new Schema({
  logoText: { type: String, required: true },
  navLinks: { type: [NavLinkSchema], required: true },
  serviceLinks: { type: [NavLinkSchema], required: true },
  ctaButton: {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
}, { timestamps: true });

const HeaderContent: Model<IHeaderContent> = models.HeaderContent || mongoose.model<IHeaderContent>('HeaderContent', HeaderContentSchema);

export default HeaderContent;
