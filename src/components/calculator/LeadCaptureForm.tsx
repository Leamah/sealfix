'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, type LeadFormValues } from '@/lib/pricing/validators';
import type { CalculatorResult, CalculatorInput, ServiceMode } from '@/lib/pricing/types';
import { formatZAR } from '@/lib/utils';

interface LeadCaptureFormProps {
  result: CalculatorResult;
  input: CalculatorInput;
  onSuccess: () => void;
  /** Set when multiple services are combined */
  combinedTotal?: number;
  combinedSubtotal?: number;
  selectedModes?: ServiceMode[];
}

export function LeadCaptureForm({
  result,
  input,
  onSuccess,
  combinedTotal,
  combinedSubtotal,
  selectedModes,
}: LeadCaptureFormProps) {
  const displayTotal = combinedTotal ?? result.total;
  const displaySubtotal = combinedSubtotal ?? result.subtotal;
  const modeLabel = selectedModes && selectedModes.length > 1
    ? selectedModes.join(' + ')
    : input.mode;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      acceptedTandCs: true,
      calculatorMode: modeLabel,
      estimateTotal: displayTotal,
      estimateSubtotal: displaySubtotal,
      region: input.region,
      quantity: input.quantity,
      unit: input.unit,
    },
  });

  async function onSubmit(data: LeadFormValues) {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    onSuccess();
  }

  if (isSubmitSuccessful) {
    return (
      <div className="rounded border border-moss-500 bg-moss-600/10 p-6 text-center">
        <p className="font-display text-xl font-bold uppercase text-moss-400">Quote request received</p>
        <p className="mt-2 text-sm text-sand-300">
          We will review your estimate of{' '}
          <strong className="text-ember-400">{formatZAR(displayTotal)}</strong> and
          contact you within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 placeholder:text-sand-400 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="font-semibold text-sand-100">Request your quote</p>
      <p className="text-xs text-sand-400">
        Estimated total:{' '}
        <strong className="text-ember-400">{formatZAR(displayTotal)}</strong>. We will confirm
        after a site inspection.
      </p>

      {/* Hidden context fields */}
      <input type="hidden" {...register('acceptedTandCs')} value="true" />
      <input type="hidden" {...register('calculatorMode')} />
      <input type="hidden" {...register('estimateTotal')} />
      <input type="hidden" {...register('estimateSubtotal')} />
      <input type="hidden" {...register('region')} />
      <input type="hidden" {...register('quantity')} />
      <input type="hidden" {...register('unit')} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <input {...register('name')} placeholder="Full name *" className={inputClass} />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <input {...register('company')} placeholder="Company (optional)" className={inputClass} />
        </div>
        <div className="space-y-1">
          <input {...register('phone')} placeholder="Phone number *" className={inputClass} type="tel" />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1">
          <input {...register('email')} placeholder="Email address *" className={inputClass} type="email" />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <textarea
        {...register('notes')}
        placeholder="Additional notes or questions (optional)"
        rows={3}
        className={inputClass}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-ember-500 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-ember-400 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Request Quote'}
      </button>
    </form>
  );
}
