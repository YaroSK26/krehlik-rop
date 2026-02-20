import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  creators: [String],
  techShowcase: [String],
  features: [String],
  benefits: [String],
  securityText: String,
}, { timestamps: true });

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
