import { RequestAssessmentForm } from '@/components/forms/RequestAssessmentForm';

interface RequestAssessmentSectionProps {
  title?: string;
  subtitle?: string;
  defaultService?: string;
}

export function RequestAssessmentSection({
  title = 'Request a Site Assessment',
  subtitle = 'Tell us what you need done, where the site is located, and when you need the work completed. We will review the scope, arrange a site inspection where required, and provide a written quote.',
  defaultService,
}: RequestAssessmentSectionProps) {
  return (
    <section id="assessment" className="bg-charcoal-800 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-sand-100">{title}</h2>
        <p className="mt-2 text-sm text-sand-400">{subtitle}</p>
        <div className="mt-8 rounded border border-charcoal-700 bg-charcoal-900 p-6 sm:p-8">
          <RequestAssessmentForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
