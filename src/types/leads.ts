export interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  notes?: string;
  calculatorMode: string;
  estimateTotal: number;
  estimateSubtotal: number;
  region: string;
  quantity: number;
  unit: string;
}
