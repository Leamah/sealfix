'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { ServiceMode } from '@/lib/pricing/types';
import type { EffectiveRates, PrepLevels, TierMultipliers, TierThresholds } from '@/lib/pricing/rate-store';

const Calculator = dynamic(() => import('@/components/calculator/Calculator').then((m) => m.Calculator), {
  ssr: false,
  loading: () => (
    <div className="flex h-48 items-center justify-center rounded border border-charcoal-700 bg-charcoal-800">
      <span className="text-sm text-sand-400">Loading calculator…</span>
    </div>
  ),
});

const MODES: ServiceMode[] = ['sealing', 'line-marking', 'pothole', 'signage-physical', 'signage-painted'];
const MODE_LABELS: Record<ServiceMode, string> = {
  sealing: 'Sealing',
  'line-marking': 'Line Marking',
  pothole: 'Pothole Repair',
  'signage-physical': 'Sign Erection (Physical)',
  'signage-painted': 'Painted Signage',
};
const MODE_UNITS: Record<ServiceMode, string> = {
  sealing: '/m²',
  'line-marking': '/lm',
  pothole: '/each',
  'signage-physical': '/sign',
  'signage-painted': '/symbol',
};
const PREP_LEVELS: (keyof PrepLevels)[] = ['light', 'medium', 'heavy', 'demolition'];
const TIER_KEYS: (keyof TierMultipliers)[] = ['small', 'medium', 'large', 'major'];

type Section = 'base' | 'prep' | 'overhead' | 'tiers' | 'thresholds' | 'calculator';

const inputClass =
  'rounded border border-charcoal-600 bg-charcoal-700 px-2 py-1.5 text-sm text-sand-100 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500 w-24';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [effective, setEffective] = useState<EffectiveRates | null>(null);
  const [edits, setEdits] = useState<Partial<EffectiveRates>>({});
  const [activeSection, setActiveSection] = useState<Section>('base');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loginError, setLoginError] = useState('');

  async function login(pw: string) {
    const res = await fetch('/api/admin/rates', { headers: { 'x-admin-password': pw } });
    if (!res.ok) { setLoginError('Wrong password or ADMIN_PASSWORD env var not set.'); return; }
    const data = await res.json();
    setEffective(data.effective);
    setEdits(JSON.parse(JSON.stringify(data.effective))); // deep clone
    setAuthed(true);
    setLoginError('');
  }

  async function save() {
    setStatus('saving');
    const res = await fetch('/api/admin/rates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(edits),
    });
    if (res.ok) {
      const data = await res.json();
      setEffective(data.effective);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  }

  function setBaseRate(mode: ServiceMode, val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({ ...p, baseRates: { ...(p.baseRates ?? effective!.baseRates), [mode]: isNaN(n) ? 0 : n } }));
  }

  function setPrepRate(mode: ServiceMode, level: keyof PrepLevels, val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({
      ...p,
      prepRates: {
        ...(p.prepRates ?? effective!.prepRates),
        [mode]: {
          ...(p.prepRates?.[mode] ?? effective!.prepRates[mode]),
          [level]: isNaN(n) ? 0 : n,
        },
      },
    }));
  }

  function setOverheadPct(val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({ ...p, overheadPct: isNaN(n) ? 0 : n / 100 }));
  }

  function setContingencyPct(val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({ ...p, contingencyPct: isNaN(n) ? 0 : n / 100 }));
  }

  function setTierMultiplier(tier: keyof TierMultipliers, val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({
      ...p,
      jobSizeMultipliers: { ...(p.jobSizeMultipliers ?? effective!.jobSizeMultipliers), [tier]: isNaN(n) ? 1 : n },
    }));
  }

  function setThreshold(unit: 'sqm' | 'linear-meters' | 'each', tier: keyof TierThresholds, val: string) {
    const n = parseFloat(val);
    setEdits((p) => ({
      ...p,
      jobSizeThresholds: {
        ...(p.jobSizeThresholds ?? effective!.jobSizeThresholds),
        [unit]: {
          ...(p.jobSizeThresholds?.[unit] ?? effective!.jobSizeThresholds[unit]),
          [tier]: isNaN(n) ? 0 : n,
        },
      },
    }));
  }

  const pw = password;
  const e = edits as Partial<EffectiveRates> & Partial<{ baseRates: Record<ServiceMode, number> }>;

  const SECTIONS: { id: Section; label: string }[] = [
    { id: 'base', label: 'Base Rates' },
    { id: 'prep', label: 'Prep Rates' },
    { id: 'overhead', label: 'Overhead & Contingency' },
    { id: 'tiers', label: 'Job Size Multipliers' },
    { id: 'thresholds', label: 'Job Size Thresholds' },
    { id: 'calculator', label: 'Live Tester' },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 rounded border border-charcoal-700 bg-charcoal-800 p-8">
          <h1 className="font-display text-2xl font-bold uppercase text-sand-100">Admin Login</h1>
          <p className="text-xs text-sand-400">Set ADMIN_PASSWORD in Vercel environment variables to enable access.</p>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login(password)}
            className="w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 placeholder:text-sand-400 focus:border-ember-500 focus:outline-none"
          />
          {loginError && <p className="text-xs text-red-400">{loginError}</p>}
          <button onClick={() => login(password)} className="w-full rounded bg-ember-500 py-2 font-semibold text-charcoal-900 hover:bg-ember-400">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (!effective) return null;

  return (
    <div className="min-h-screen bg-charcoal-900 pb-20">
      <div className="sticky top-0 z-10 border-b border-charcoal-700 bg-charcoal-900/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between gap-4">
          <h1 className="font-display text-xl font-bold uppercase text-sand-100">Pricing Admin</h1>
          <div className="flex items-center gap-3">
            {status === 'saved' && <span className="text-sm text-moss-400">Saved.</span>}
            {status === 'error' && <span className="text-sm text-red-400">Error saving.</span>}
            <button
              onClick={save}
              disabled={status === 'saving'}
              className="rounded bg-ember-500 px-5 py-2 font-semibold text-charcoal-900 hover:bg-ember-400 disabled:opacity-50"
            >
              {status === 'saving' ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>
        {/* Section tabs */}
        <div className="mx-auto max-w-4xl px-4 flex gap-1 pb-3 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`rounded px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSection === s.id
                  ? 'bg-ember-500 text-charcoal-900'
                  : 'bg-charcoal-700 text-sand-300 hover:bg-charcoal-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 space-y-8">

        {/* BASE RATES */}
        {activeSection === 'base' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Base Rates</h2>
            <p className="text-xs text-sand-400 mb-4">Base cost per unit before any adjustments. Excludes VAT.</p>
            <div className="space-y-3">
              {MODES.map((mode) => (
                <div key={mode} className="flex items-center gap-4 rounded border border-charcoal-700 bg-charcoal-800 p-4">
                  <span className="flex-1 text-sm text-sand-200">{MODE_LABELS[mode]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-sand-400">R</span>
                    <input
                      type="number" min={0} step={0.5}
                      value={e.baseRates?.[mode] ?? effective.baseRates[mode]}
                      onChange={(ev) => setBaseRate(mode, ev.target.value)}
                      className={inputClass}
                    />
                    <span className="text-xs text-sand-400">{MODE_UNITS[mode]}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PREP RATES */}
        {activeSection === 'prep' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Surface Preparation Rates</h2>
            <p className="text-xs text-sand-400 mb-4">Added on top of the base rate. Per unit, excl. VAT.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-charcoal-700">
                    <th className="py-2 text-left text-xs uppercase tracking-wider text-sand-400 pr-4">Service</th>
                    {PREP_LEVELS.map((l) => (
                      <th key={l} className="py-2 text-center text-xs uppercase tracking-wider text-sand-400 px-2">{l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-700">
                  {MODES.map((mode) => (
                    <tr key={mode} className="bg-charcoal-800">
                      <td className="py-3 pr-4 text-sand-200 font-medium">{MODE_LABELS[mode]}</td>
                      {PREP_LEVELS.map((level) => (
                        <td key={level} className="py-3 px-2 text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <span className="text-sand-400 text-xs">R</span>
                            <input
                              type="number" min={0} step={0.5}
                              value={e.prepRates?.[mode]?.[level] ?? effective.prepRates[mode][level]}
                              onChange={(ev) => setPrepRate(mode, level, ev.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* OVERHEAD & CONTINGENCY */}
        {activeSection === 'overhead' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Overhead & Contingency</h2>
            <p className="text-xs text-sand-400 mb-4">Applied as a percentage of the material total (after all adjustments).</p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded border border-charcoal-700 bg-charcoal-800 p-4">
                <span className="flex-1 text-sm text-sand-200">Overhead & management</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min={0} max={100} step={0.5}
                    value={((e.overheadPct ?? effective.overheadPct) * 100).toFixed(1)}
                    onChange={(ev) => setOverheadPct(ev.target.value)}
                    className={inputClass}
                  />
                  <span className="text-sm text-sand-400">%</span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded border border-charcoal-700 bg-charcoal-800 p-4">
                <span className="flex-1 text-sm text-sand-200">Contingency</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min={0} max={100} step={0.5}
                    value={((e.contingencyPct ?? effective.contingencyPct) * 100).toFixed(1)}
                    onChange={(ev) => setContingencyPct(ev.target.value)}
                    className={inputClass}
                  />
                  <span className="text-sm text-sand-400">%</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* JOB SIZE MULTIPLIERS */}
        {activeSection === 'tiers' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Job Size Multipliers</h2>
            <p className="text-xs text-sand-400 mb-4">
              Volume discount factors applied to the base cost. 1.00 = no change. Below 1.00 = discount.
              Thresholds (what quantity triggers each tier) are set under Job Size Thresholds.
            </p>
            <div className="space-y-3">
              {TIER_KEYS.map((tier) => (
                <div key={tier} className="flex items-center gap-4 rounded border border-charcoal-700 bg-charcoal-800 p-4">
                  <span className="flex-1 text-sm text-sand-200 capitalize">{tier} job</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-sand-400">x</span>
                    <input
                      type="number" min={0.1} max={3} step={0.01}
                      value={e.jobSizeMultipliers?.[tier] ?? effective.jobSizeMultipliers[tier]}
                      onChange={(ev) => setTierMultiplier(tier, ev.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* JOB SIZE THRESHOLDS */}
        {activeSection === 'thresholds' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Job Size Thresholds</h2>
            <p className="text-xs text-sand-400 mb-4">
              The quantity at which a job moves to the next tier. Example: if small = 200 for m², then any job under 200 m² is &quot;small&quot;.
            </p>
            {(
              [
                { unit: 'sqm' as const, label: 'Area-based (m²) — sealing' },
                { unit: 'linear-meters' as const, label: 'Linear metres (lm) — line marking' },
                { unit: 'each' as const, label: 'Per-unit (each) — potholes & signage' },
              ] as const
            ).map(({ unit, label }) => (
              <div key={unit} className="mb-6 rounded border border-charcoal-700 bg-charcoal-800 p-4">
                <p className="text-sm font-semibold text-sand-200 mb-3">{label}</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['small', 'medium', 'large'] as const).map((tier) => (
                    <div key={tier}>
                      <p className="text-xs text-sand-400 mb-1 uppercase">{tier} tier starts under</p>
                      <input
                        type="number" min={1} step={1}
                        value={e.jobSizeThresholds?.[unit]?.[tier] ?? effective.jobSizeThresholds[unit][tier]}
                        onChange={(ev) => setThreshold(unit, tier, ev.target.value)}
                        className={inputClass + ' w-full'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* LIVE TESTER */}
        {activeSection === 'calculator' && (
          <section>
            <h2 className="font-display text-lg font-bold uppercase text-sand-100 mb-1">Live Rate Tester</h2>
            <p className="text-xs text-sand-400 mb-6">
              Test your current rate settings in real time. Save your changes first, then use the calculator
              below to verify the output. The T&amp;Cs and quote request form are disabled in this view.
            </p>
            <Calculator />
          </section>
        )}

        {/* Permanent changes note */}
        <div className="rounded border border-ember-500/40 bg-charcoal-800 p-5 text-xs text-sand-300 space-y-3">
          <p className="font-semibold text-ember-400 text-sm">⚠ Changes here are temporary</p>
          <p>
            The inputs above update the current server instance only. Vercel runs serverless, so
            these values are lost on the next deploy or when a new instance spins up. Use the Live
            Tester to preview rate changes, then copy the final numbers into Vercel environment
            variables below for them to stick.
          </p>

          <div>
            <p className="font-semibold text-sand-200 mt-2 mb-1">How to make base rates permanent:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to <span className="text-sand-100">Vercel → Project Settings → Environment Variables</span></li>
              <li>Add the keys below with your chosen values</li>
              <li>Trigger a redeploy (push any commit, or use the Redeploy button)</li>
            </ol>
          </div>

          <div className="rounded bg-charcoal-900 p-3 font-mono text-[11px] text-sand-200 leading-relaxed overflow-x-auto">
            <div>RATE_OVERRIDE_BASE_SEALING={effective.baseRates.sealing}</div>
            <div>RATE_OVERRIDE_BASE_LINE_MARKING={effective.baseRates['line-marking']}</div>
            <div>RATE_OVERRIDE_BASE_POTHOLE={effective.baseRates.pothole}</div>
            <div>RATE_OVERRIDE_BASE_SIGNAGE_PHYSICAL={effective.baseRates['signage-physical']}</div>
            <div>RATE_OVERRIDE_BASE_SIGNAGE_PAINTED={effective.baseRates['signage-painted']}</div>
            <div>RATE_OVERRIDE_OVERHEAD_PCT={effective.overheadPct.toFixed(3)}</div>
            <div>RATE_OVERRIDE_CONTINGENCY_PCT={effective.contingencyPct.toFixed(3)}</div>
          </div>

          <p className="text-sand-400">
            Any env var that is set takes precedence over the hard-coded default. You don&apos;t have
            to set all of them — only the ones you want to change. Prep rates, job-size tiers, and
            thresholds still require a code change to persist (ask your developer).
          </p>
        </div>
      </div>
    </div>
  );
}
