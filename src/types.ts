export type PracticeType = 'Chartered Accountant' | 'Tax Consultant' | 'Financial Advisor' | 'CA Firm (Multi-partner)';

export interface PackageDetail {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  priceMonthly: number;
  minMonths: number;
  highlight?: boolean;
  bestFor: string;
  features: string[];
}

export interface ConsultationFormData {
  name: string;
  practiceName: string;
  practiceType: PracticeType;
  city: string;
  phone: string;
  email: string;
  selectedPackage?: string;
  note?: string;
}
