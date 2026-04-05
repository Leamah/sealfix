'use client';

import { useState, useEffect } from 'react';
import type { ServiceMode } from '@/lib/pricing/types';

const SERVICE_LABELS: Record<ServiceMode, string> = {
  sealing: 'Sealing (per m²)',
  surfacing: 'Surfacing (per m²)',
  'line-marking': 'Line Marking (per lm)',
  pothole: 'Pothole Repair (each)',
  signage: 'Signage (per sign)',
};

const MODES: ServiceMode[] = ['sealing', 'surfacing', 'line-marking', 'pothole', 'signage'];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rates, setRates] = useState<Record<ServiceMode, number> | null>(null);
  const [edits, setEdits] = useState<Partial<Record<ServiceMode, string>>>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  async function fetchRates(pw: string) {
    const res = await fetch('/api/admin/rates', {
      headers: { 'x-admin-password': pw },
    });
    if (!res.ok) {
      setError('Wrong password or ADMIN_PASSWORD env var not set.');
      return;
    }
    const data = await res.json();
    setRates(data.rates);
    const initial: Partial<Record<ServiceMode, string>> = {};
    for (const mode of MODES) {
      initial[mode] = String(data.rates[mode]);
    }
    setEdits(initial);
    setAuthed(true);
    setError('');
  }

  async function save() {
    if (!rates) return;
    setStatus('saving');
    const ratesPayload: Partial<Record<ServiceMode, number>> = {};
    for (const mode of MODES) {
      const val = parseFloat(edits[mode] ?? '');
      if (!isNaN(val)) ratesPayload[mode] = val;
    }
    const res = await fetch('/api/admin/rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ rates: ratesPayload }),
    });
    if (res.ok) {
      const data = await res.json();
      setRates(data.rates);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';

  if (!authed) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 rounded border border-charcoal-700 bg-charcoal-800 p-8">
          <h1 className="font-display text-2xl font-bold uppercase text-sand-100">Admin Login</h1>
          <p className="text-xs text-sand-400">Set ADMIN_PASSWORD in your .env.local to enable access.</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchRates(password)}
            className={inputClass}
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={() => fetchRates(password)}
            className="w-full rounded bg-ember-500 py-2 font-semibold text-charcoal-900 hover:bg-ember-400"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold uppercase text-sand-100">Admin: Base Rates</h1>
        <p className="mt-2 text-sm text-sand-400">
          Rates are in ZAR per unit (excl. VAT). Changes apply immediately to the running server instance.
          To make them permanent, set <code className="text-ember-400">RATE_OVERRIDE_*</code> env vars and redeploy.
        </p>

        <div className="mt-8 space-y-4">
          {MODES.map((mode) => (
            <div key={mode} className="flex items-center gap-4 rounded border border-charcoal-700 bg-charcoal-800 p-4">
              <label className="flex-1 text-sm text-sand-200">{SERVICE_LABELS[mode]}</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-sand-400">R</span>
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  value={edits[mode] ?? ''}
                  onChange={(e) => setEdits((prev) => ({ ...prev, [mode]: e.target.value }))}
                  className="w-32 rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500"
                />
                <span className="text-xs text-sand-400">/unit</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={save}
            disabled={status === 'saving'}
            className="rounded bg-ember-500 px-6 py-2 font-semibold text-charcoal-900 hover:bg-ember-400 disabled:opacity-50"
          >
            {status === 'saving' ? 'Saving...' : 'Save Rates'}
          </button>
          {status === 'saved' && <p className="text-sm text-moss-400">Rates updated for this session.</p>}
          {status === 'error' && <p className="text-sm text-red-400">Save failed.</p>}
        </div>

        <div className="mt-10 rounded border border-charcoal-700 bg-charcoal-800 p-6">
          <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-3">To make rates permanent</h2>
          <p className="text-sm text-sand-300 mb-3">
            Add these to your <code className="text-ember-400">.env.local</code> file (dev) or Vercel environment variables (production):
          </p>
          <pre className="text-xs text-sand-400 leading-loose overflow-x-auto">
{MODES.map((m) => `RATE_OVERRIDE_${m.toUpperCase().replace('-', '_')}=${edits[m] ?? ''}`).join('\n')}
          </pre>
        </div>
      </div>
    </div>
  );
}
