import { z } from 'zod';

export const calculatorInputSchema = z.object({
  mode: z.enum(['sealing', 'surfacing', 'line-marking', 'pothole']),
  quantity: z.number().min(1).max(100000),
  unit: z.enum(['sqm', 'linear-meters', 'each']),
  jobSizeTier: z.enum(['small', 'medium', 'large', 'major']),
  region: z.string().min(1),
  urgency: z.enum(['standard', 'expedited', 'emergency']),
  accessDifficulty: z.enum(['easy', 'moderate', 'restricted', 'crane']),
  prepLevel: z.enum(['light', 'medium', 'heavy', 'demolition']),
  serviceTier: z.enum(['economy', 'standard', 'premium']),
});

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  notes: z.string().optional(),
  acceptedTandCs: z.literal(true, 'You must accept the terms and conditions'),
  // Calculator context stored with the lead
  calculatorMode: z.string(),
  estimateTotal: z.number(),
  estimateSubtotal: z.number(),
  region: z.string(),
  quantity: z.number(),
  unit: z.string(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
