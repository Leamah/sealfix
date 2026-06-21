export interface ServicePage {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroImage: string;
  /** Omitted for civil engineering / construction services that have no instant-price calculator. */
  calculatorMode?: 'sealing' | 'line-marking' | 'pothole' | 'signage-physical' | 'signage-painted';
  /** Groups the service for the services overview page. */
  category: 'civil' | 'surface';
  useCases: string[];
  pricingFactors: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface AreaPage {
  slug: string;
  name: string;
  province: string;
  regionKey: string;
  description: string;
  population: string;
  /** Civil-engineering-framed intro naming nearby towns served. */
  intro: string;
  /** Comma-separated list of typical site types served in this area. */
  sitesServed: string;
}

export interface IndustryPage {
  slug: string;
  name: string;
  description: string;
  relevantServices: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readingTime: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
