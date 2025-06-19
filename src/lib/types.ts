export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Web' | 'App' | 'Marketing' | 'Software';
  dataAiHint?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatarUrl?: string;
  dataAiHint?: string;
}

export interface USP {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}
