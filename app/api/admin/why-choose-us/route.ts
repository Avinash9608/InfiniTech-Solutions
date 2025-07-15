
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import WhyChooseUsContent from '@/models/WhyChooseUsContent';

const initialUspData = {
    uspItems: [
      { title: 'Experienced & Certified Team', description: 'Our professionals bring years of expertise and industry certifications to deliver top-quality solutions.', icon: 'Users' },
      { title: 'Client-Centric Approach', description: 'We prioritize your needs, ensuring tailored solutions and transparent communication throughout the project.', icon: 'HeartHandshake' },
      { title: 'Affordable Pricing', description: 'Competitive and transparent pricing models designed to provide maximum value for your investment.', icon: 'BadgeDollarSign' },
      { title: '24/7 Support', description: 'Dedicated support team available around the clock to assist you with any queries or issues.', icon: 'Clock' },
      { title: 'Agile Development', description: 'Flexible and iterative development process to adapt to changes and deliver results efficiently.', icon: 'RefreshCcw' },
      { title: 'Innovative Solutions', description: 'We leverage the latest technologies to provide cutting-edge solutions that drive business growth.', icon: 'Zap' },
    ]
};

export async function GET() {
  await dbConnect();
  try {
    let content = await WhyChooseUsContent.findOne();
    if (!content) {
      content = await WhyChooseUsContent.create(initialUspData);
    }
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
