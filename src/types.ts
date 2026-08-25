export interface LeadFormData {
  fullName: string;
  whatsapp: string;
  courseType: string;
  agreedToTerms: boolean;
}

export interface InfluencerData {
  code: string;
  creatorName: string;
  handle: string;
  discountPercentage: number;
  avatarUrl?: string;
  customMessage?: string;
}

export interface Benefit {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  highlightText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  influencerRef: string;
  text: string;
  rating: number;
  avatar: string;
}
