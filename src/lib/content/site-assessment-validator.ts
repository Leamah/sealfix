import { z } from 'zod';

export const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
] as const;

export const PROJECT_TYPES = [
  'New construction',
  'Repair or maintenance',
  'Upgrade or expansion',
  'Not sure',
] as const;

export const SURFACE_CONDITIONS = ['Good', 'Fair', 'Poor', 'Failed', 'Not applicable'] as const;

export const ASSESSMENT_URGENCY = ['standard', 'urgent', 'emergency'] as const;

export const siteAssessmentSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  siteLocation: z.string().min(2, 'Please enter the site location'),
  province: z.string().min(1, 'Please select a province'),
  projectType: z.string().min(1, 'Please select a project type'),
  serviceRequired: z.string().min(1, 'Please select a service'),
  approximateSize: z.string().optional(),
  surfaceCondition: z.string().optional(),
  preferredVisitDate: z.string().optional(),
  urgency: z.enum(ASSESSMENT_URGENCY),
  message: z.string().optional(),
});

export type SiteAssessmentValues = z.infer<typeof siteAssessmentSchema>;

export interface SiteAssessmentAttachment {
  name: string;
  content: string;
}
