'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  siteAssessmentSchema,
  type SiteAssessmentValues,
  SA_PROVINCES,
  PROJECT_TYPES,
  SURFACE_CONDITIONS,
} from '@/lib/content/site-assessment-validator';
import { SERVICES } from '@/lib/content/services';

const MAX_TOTAL_BYTES = 3 * 1024 * 1024; // 3MB combined raw file size

interface RequestAssessmentFormProps {
  /** Pre-select a service when embedded on a specific service page */
  defaultService?: string;
}

const inputClass =
  'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 placeholder:text-sand-400 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';

const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-sand-400 mb-1';

export function RequestAssessmentForm({ defaultService }: RequestAssessmentFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SiteAssessmentValues>({
    resolver: zodResolver(siteAssessmentSchema),
    defaultValues: {
      urgency: 'standard',
      serviceRequired: defaultService ?? '',
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const totalBytes = selected.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setFileError('Photos must total under 3MB. Please select fewer or smaller images, or email them separately.');
      return;
    }
    setFileError('');
    setFiles(selected.slice(0, 5));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1] ?? '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(data: SiteAssessmentValues) {
    const attachments = await Promise.all(
      files.map(async (file) => ({ name: file.name, content: await fileToBase64(file) }))
    );

    await fetch('/api/site-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, attachments }),
    });
  }

  if (isSubmitSuccessful) {
    return (
      <div className="rounded border border-moss-500 bg-moss-600/10 p-6 text-center">
        <p className="font-display text-xl font-bold uppercase text-moss-400">Request received</p>
        <p className="mt-2 text-sm text-sand-300">
          Thank you. SealFix will review your request and contact you to confirm the next step. A written
          quote can only be issued after the scope and site conditions are confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Name *</label>
          <input {...register('name')} className={inputClass} placeholder="Full name" />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Company</label>
          <input {...register('company')} className={inputClass} placeholder="Optional" />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Phone *</label>
          <input {...register('phone')} type="tel" className={inputClass} placeholder="+27 …" />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Email *</label>
          <input {...register('email')} type="email" className={inputClass} placeholder="email@example.com" />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Site Location *</label>
          <input {...register('siteLocation')} className={inputClass} placeholder="Suburb, city" />
          {errors.siteLocation && <p className="text-xs text-red-400">{errors.siteLocation.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Province *</label>
          <select {...register('province')} className={inputClass} defaultValue="">
            <option value="" disabled>Select province</option>
            {SA_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.province && <p className="text-xs text-red-400">{errors.province.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Project Type *</label>
          <select {...register('projectType')} className={inputClass} defaultValue="">
            <option value="" disabled>Select project type</option>
            {PROJECT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.projectType && <p className="text-xs text-red-400">{errors.projectType.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Service Required *</label>
          <select {...register('serviceRequired')} className={inputClass} defaultValue={defaultService ?? ''}>
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Not sure / multiple services">Not sure / multiple services</option>
          </select>
          {errors.serviceRequired && <p className="text-xs text-red-400">{errors.serviceRequired.message}</p>}
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Approximate Site Size</label>
          <input {...register('approximateSize')} className={inputClass} placeholder="e.g. 500 m², or unknown" />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Current Surface Condition</label>
          <select {...register('surfaceCondition')} className={inputClass} defaultValue="">
            <option value="" disabled>Select condition</option>
            {SURFACE_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Preferred Site Visit Date</label>
          <input {...register('preferredVisitDate')} type="date" className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Urgency *</label>
          <select {...register('urgency')} className={inputClass}>
            <option value="standard">Standard</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Message or Scope Description</label>
        <textarea
          {...register('message')}
          rows={4}
          className={inputClass + ' resize-none'}
          placeholder="Tell us what needs to be built, repaired, resurfaced, or marked."
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Photos (optional)</label>
        {files.length > 0 ? (
          <ul className="space-y-1">
            {files.map((file, i) => (
              <li key={i} className="flex items-center justify-between rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-xs text-sand-300">
                <span className="truncate">{file.name}</span>
                <button type="button" onClick={() => removeFile(i)} className="ml-2 text-sand-500 hover:text-red-400">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-charcoal-600 py-5 text-sm text-sand-400 hover:border-ember-500 hover:text-sand-200 transition-colors"
          >
            Click to attach photos (up to 5, 3MB total)
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        {fileError && <p className="text-xs text-red-400">{fileError}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-ember-500 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-ember-400 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending…' : 'Request a Site Assessment'}
      </button>
    </form>
  );
}
