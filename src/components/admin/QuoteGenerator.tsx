'use client';

import { useState, useCallback, useRef } from 'react';
import { COMPANY } from '@/lib/content/company';

// ─── types ────────────────────────────────────────────────────────────────────

interface QuoteLine {
  id: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
}

interface ClientDetails {
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  siteAddress: string;
}

interface QuoteMeta {
  quoteNo: string;
  date: string;
  validUntil: string;
  poRef: string;
  notes: string;
  vatEnabled: boolean;
}

interface FinalQuote {
  meta: QuoteMeta;
  client: ClientDetails;
  lines: QuoteLine[];
  imageDataUrl: string | null;
  imageCaption: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2, 9); }

function today() {
  return new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });
}

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });
}

function genQuoteNo() {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  return `SFQ-${ymd}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function fmt(n: number) {
  return `R ${n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function lineAmount(l: QuoteLine) { return l.qty * l.unitPrice; }

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: { label: string; items: Omit<QuoteLine, 'id'>[] }[] = [
  {
    label: 'Sealing / Surfacing',
    items: [
      { description: 'Bitumen sealing', qty: 1, unit: 'm²', unitPrice: 45 },
      { description: 'Surface preparation — light', qty: 1, unit: 'm²', unitPrice: 8 },
      { description: 'Overhead & management', qty: 1, unit: 'lump sum', unitPrice: 0 },
    ],
  },
  {
    label: 'Line Marking',
    items: [
      { description: 'Line marking', qty: 1, unit: 'lm', unitPrice: 22 },
      { description: 'Disabled parking bay symbol', qty: 1, unit: 'each', unitPrice: 290 },
      { description: 'Stop line', qty: 1, unit: 'each', unitPrice: 600 },
      { description: 'Directional arrow', qty: 1, unit: 'each', unitPrice: 420 },
    ],
  },
  {
    label: 'Pothole Repair',
    items: [
      { description: 'Pothole repair', qty: 1, unit: 'each', unitPrice: 350 },
      { description: 'Surface preparation — medium', qty: 1, unit: 'each', unitPrice: 120 },
    ],
  },
  {
    label: 'Physical Signage',
    items: [
      { description: 'Stop sign (R1) — supply & erect', qty: 1, unit: 'each', unitPrice: 600 },
      { description: 'Give way sign (R2) — supply & erect', qty: 1, unit: 'each', unitPrice: 550 },
      { description: 'Disabled parking sign — supply & erect', qty: 1, unit: 'each', unitPrice: 290 },
      { description: 'No parking sign — supply & erect', qty: 1, unit: 'each', unitPrice: 320 },
      { description: 'Speed limit sign — supply & erect', qty: 1, unit: 'each', unitPrice: 480 },
      { description: 'Sign post — galvanised steel', qty: 1, unit: 'each', unitPrice: 380 },
    ],
  },
  {
    label: 'Painted Signage',
    items: [
      { description: 'Painted speed hump warning', qty: 1, unit: 'each', unitPrice: 650 },
      { description: 'Painted pedestrian crossing', qty: 1, unit: 'each', unitPrice: 900 },
      { description: 'Painted road marking symbol', qty: 1, unit: 'each', unitPrice: 420 },
    ],
  },
];

// ─── Standard T&Cs ────────────────────────────────────────────────────────────

const TERMS = [
  { heading: '1. Quotation Validity', body: 'This quotation is valid for 30 days from the date of issue. SealFix SA reserves the right to revise pricing after this period to account for fluctuations in material costs, labour rates, or fuel levies.' },
  { heading: '2. Acceptance', body: 'This quotation becomes a binding agreement only upon written acceptance by the client (signed copy of this document or written confirmation by email). Verbal acceptance is not binding.' },
  { heading: '3. Payment Terms', body: "50% deposit is required prior to commencement of work. The balance is due on the day of practical completion. Invoices not settled within 7 days of the due date will attract interest at the maximum permissible rate under the National Credit Act (No. 34 of 2005). SealFix SA reserves the right to suspend or terminate works on accounts overdue by more than 14 days." },
  { heading: '4. VAT', body: 'SealFix SA is not currently registered for VAT. All prices quoted are VAT-exclusive unless explicitly stated otherwise on this quotation.' },
  { heading: '5. Site Access & Preparation', body: "The client is responsible for ensuring safe, unobstructed access to the site on the agreed commencement date. Any delays caused by restricted access, incomplete site preparation, or third-party interference will be for the client's account at a standing-time rate. The client must ensure the site is free of vehicles, equipment, or any obstructions prior to work commencing." },
  { heading: '6. Variations & Additional Work', body: 'Any variation to the agreed scope of work must be approved in writing by both parties before execution. Variations will be priced separately and added to the final invoice. SealFix SA accepts no liability for work performed outside the agreed scope without written authorisation.' },
  { heading: '7. Materials', body: "All materials supplied by SealFix SA will be new, fit for purpose, and sourced from reputable South African suppliers. No material substitutions will be made without the client's written consent. Where materials are specified by the client, SealFix SA accepts no responsibility for suitability or performance thereof." },
  { heading: '8. Workmanship Warranty', body: 'A 12-month workmanship warranty applies from the date of practical completion, covering defects arising from faulty execution. This warranty is void if the surface is subjected to abnormal loads, chemical exposure, or interference by parties other than SealFix SA.' },
  { heading: '9. Limitation of Liability', body: "SealFix SA's total liability under this agreement shall not exceed the total contract value. SealFix SA shall not be liable for any indirect, consequential, or special losses, including but not limited to loss of income, business interruption, or damage to third-party property." },
  { heading: '10. Insurance', body: 'SealFix SA maintains public liability insurance for the duration of works. A certificate of insurance is available on request. The client is advised to maintain their own property and asset insurance throughout the contract period.' },
  { heading: '11. Cancellation', body: 'Should the client cancel this agreement after acceptance but before work has commenced, no cancellation fee will apply provided written notice is received before mobilisation. Once work has commenced, the client will be liable for all costs incurred to date, including materials, labour, and standing time, plus an administration fee of 20% of the quoted value.' },
  { heading: '12. Dispute Resolution', body: 'In the event of a dispute, the parties agree to first attempt resolution through good-faith negotiation. Failing resolution within 14 days, the matter shall be referred to a mutually agreed mediator under the auspices of AFSA. This agreement is governed by the laws of the Republic of South Africa.' },
  { heading: '13. Consumer Protection Act', body: 'Where applicable, this agreement is subject to the Consumer Protection Act 68 of 2008. Consumers are entitled to a cooling-off period of 5 business days for transactions concluded as a result of direct marketing.' },
];

// ─── styles ───────────────────────────────────────────────────────────────────

const inputCls = 'w-full rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-100 placeholder:text-sand-500 focus:border-ember-500 focus:outline-none focus:ring-1 focus:ring-ember-500';
const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-sand-400 mb-1.5';
const cardCls = 'rounded border border-charcoal-700 bg-charcoal-800 p-6';

// ─── QuoteDocument ─────────────────────────────────────────────────────────────

function QuoteDocument({ q }: { q: FinalQuote }) {
  const { meta, client, lines, imageDataUrl, imageCaption } = q;
  const addr = COMPANY.address;
  const subtotal = lines.reduce((s, l) => s + lineAmount(l), 0);
  const vat = meta.vatEnabled ? subtotal * 0.15 : 0;
  const total = subtotal + vat;
  const cell: React.CSSProperties = { padding: '6px 0', verticalAlign: 'top' };

  return (
    <div id="quote-document">
      {/* ── Page 1: Quote ── */}
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11pt', color: '#1a1a1a', background: '#fff', width: '210mm', margin: '0 auto', padding: '14mm 14mm 12mm', boxSizing: 'border-box', lineHeight: 1.45, breakAfter: 'page' }}>

        {/* Header */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18 }}>
          <tbody><tr>
            <td style={{ verticalAlign: 'top', width: '55%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="SealFix SA" style={{ height: 52, display: 'block', marginBottom: 8, objectFit: 'contain' }} />
              <div style={{ fontSize: '8.5pt', color: '#555', lineHeight: 1.65 }}>
                <strong style={{ fontSize: '10.5pt', color: '#1a1a1a' }}>{COMPANY.legalName}</strong><br />
                {addr.streetAddress}, {addr.addressLocality}, {addr.postalCode}<br />
                {COMPANY.phone} &nbsp;|&nbsp; {COMPANY.email}<br />
                {COMPANY.url.replace('https://', '')}
              </div>
            </td>
            <td style={{ verticalAlign: 'top', textAlign: 'right' }}>
              <div style={{ fontSize: '22pt', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Quotation</div>
              <table style={{ marginLeft: 'auto', borderCollapse: 'collapse', fontSize: '9pt' }}>
                <tbody>
                  {[['Quote No.', meta.quoteNo], ['Date', meta.date], ['Valid Until', meta.validUntil], ...(meta.poRef ? [['Client Ref.', meta.poRef]] : [])].map(([lbl, val]) => (
                    <tr key={lbl}><td style={{ color: '#666', paddingRight: 10, paddingBottom: 3 }}>{lbl}</td><td style={{ fontWeight: 600, textAlign: 'right', paddingBottom: 3 }}>{val}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr></tbody>
        </table>

        <div style={{ borderTop: '2px solid #e8a020', marginBottom: 16 }} />

        {/* Client + Site */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <tbody><tr>
            <td style={{ verticalAlign: 'top', width: '50%', background: '#f8f8f8', padding: '10px 14px', borderRadius: 4 }}>
              <div style={{ fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 6 }}>Prepared For</div>
              <div style={{ fontWeight: 700, fontSize: '11pt', marginBottom: 2 }}>{client.name}</div>
              {client.company && <div style={{ fontSize: '10pt', marginBottom: 2 }}>{client.company}</div>}
              {client.phone && <div style={{ fontSize: '9pt', color: '#555', marginBottom: 1 }}>{client.phone}</div>}
              {client.email && <div style={{ fontSize: '9pt', color: '#555', marginBottom: 1 }}>{client.email}</div>}
              {client.address && <div style={{ fontSize: '9pt', color: '#555', marginTop: 4, whiteSpace: 'pre-line' }}>{client.address}</div>}
            </td>
            <td style={{ width: '4%' }} />
            <td style={{ verticalAlign: 'top', width: '46%', background: '#f8f8f8', padding: '10px 14px', borderRadius: 4 }}>
              <div style={{ fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 6 }}>Site / Project</div>
              {client.siteAddress ? <div style={{ fontSize: '9.5pt', whiteSpace: 'pre-line' }}>{client.siteAddress}</div> : <div style={{ fontSize: '9pt', color: '#aaa' }}>—</div>}
            </td>
          </tr></tbody>
        </table>

        {/* Line items */}
        <div style={{ fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 8 }}>Items</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid #1a1a1a' }}>
              <th style={{ textAlign: 'left', paddingBottom: 5, fontWeight: 700, width: '42%' }}>Description</th>
              <th style={{ textAlign: 'right', paddingBottom: 5, fontWeight: 700, width: '10%' }}>Qty</th>
              <th style={{ textAlign: 'left', paddingBottom: 5, fontWeight: 700, width: '12%', paddingLeft: 8 }}>Unit</th>
              <th style={{ textAlign: 'right', paddingBottom: 5, fontWeight: 700, width: '18%' }}>Unit Price</th>
              <th style={{ textAlign: 'right', paddingBottom: 5, fontWeight: 700, width: '18%' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr key={line.id} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa', breakInside: 'avoid' }}>
                <td style={cell}>{line.description}</td>
                <td style={{ ...cell, textAlign: 'right' }}>{line.qty.toLocaleString('en-ZA')}</td>
                <td style={{ ...cell, paddingLeft: 8, color: '#666', fontSize: '9pt' }}>{line.unit}</td>
                <td style={{ ...cell, textAlign: 'right' }}>{fmt(line.unitPrice)}</td>
                <td style={{ ...cell, textAlign: 'right', fontWeight: 500 }}>{fmt(lineAmount(line))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ breakBefore: 'avoid' }}>
            <tr style={{ borderTop: '1px solid #ccc' }}>
              <td colSpan={4} style={{ paddingTop: 7, textAlign: 'right', color: '#555' }}>Subtotal (excl. VAT)</td>
              <td style={{ paddingTop: 7, textAlign: 'right' }}>{fmt(subtotal)}</td>
            </tr>
            {meta.vatEnabled && (
              <tr>
                <td colSpan={4} style={{ paddingTop: 3, textAlign: 'right', color: '#555' }}>VAT @ 15%</td>
                <td style={{ paddingTop: 3, textAlign: 'right', color: '#555' }}>{fmt(vat)}</td>
              </tr>
            )}
            <tr style={{ borderTop: '2px solid #e8a020', background: '#fffbf2' }}>
              <td colSpan={4} style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'right', fontWeight: 700, fontSize: '12pt' }}>TOTAL{meta.vatEnabled ? ' (incl. VAT)' : ''}</td>
              <td style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'right', fontWeight: 700, fontSize: '12pt' }}>{fmt(total)}</td>
            </tr>
          </tfoot>
        </table>

        {meta.notes && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 5 }}>Notes</div>
            <div style={{ fontSize: '10pt', whiteSpace: 'pre-line', color: '#333' }}>{meta.notes}</div>
          </div>
        )}

        {/* Acceptance */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 10 }}>Acceptance</div>
          <div style={{ fontSize: '9pt', color: '#555', marginBottom: 14 }}>By signing below, I/we confirm having read and accepted this quotation and the Standard Terms &amp; Conditions overleaf, and authorise SealFix SA to proceed with the work described above.</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt' }}>
            <tbody><tr>
              {['Authorised Signature', 'Full Name', 'Date'].map((lbl) => (
                <td key={lbl} style={{ paddingRight: 24, paddingBottom: 20 }}>
                  <div style={{ borderBottom: '1px solid #999', marginBottom: 4, paddingBottom: 18 }} />
                  <div style={{ color: '#666' }}>{lbl}</div>
                </td>
              ))}
            </tr></tbody>
          </table>
        </div>

        <div style={{ borderTop: '1px solid #ddd', paddingTop: 8, marginTop: 8, fontSize: '8pt', color: '#999', textAlign: 'center' }}>
          {COMPANY.legalName} &nbsp;·&nbsp; {addr.streetAddress}, {addr.addressLocality} {addr.postalCode} &nbsp;·&nbsp; {COMPANY.phone} &nbsp;·&nbsp; {COMPANY.email}
          {imageDataUrl && <span> &nbsp;·&nbsp; <em>See Appendix A</em></span>}
        </div>
      </div>

      {/* ── Page 2: Appendix (image) — only if attached, comes before T&Cs ── */}
      {imageDataUrl && (
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: '#fff', width: '210mm', margin: '0 auto', padding: '14mm 14mm 12mm', boxSizing: 'border-box', breakBefore: 'page', breakAfter: 'page' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '14pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Appendix A</div>
              <div style={{ fontSize: '9pt', color: '#777', marginTop: 2 }}>Site / Project Reference — {meta.quoteNo}</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="SealFix SA" style={{ height: 36, objectFit: 'contain' }} />
          </div>
          <div style={{ borderTop: '2px solid #e8a020', marginBottom: 20 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageDataUrl} alt="Site reference" style={{ display: 'block', width: '100%', maxHeight: '220mm', objectFit: 'contain', borderRadius: 4, border: '1px solid #ddd' }} />
          {imageCaption && <div style={{ marginTop: 10, fontSize: '9pt', color: '#555', textAlign: 'center', fontStyle: 'italic' }}>{imageCaption}</div>}
          <div style={{ borderTop: '1px solid #ddd', paddingTop: 8, marginTop: 20, fontSize: '7.5pt', color: '#999', textAlign: 'center' }}>
            {COMPANY.legalName} &nbsp;·&nbsp; {COMPANY.phone} &nbsp;·&nbsp; {COMPANY.email}
          </div>
        </div>
      )}

      {/* ── Last page: T&Cs — always last ── */}
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '9.5pt', color: '#1a1a1a', background: '#fff', width: '210mm', margin: '0 auto', padding: '14mm 14mm 12mm', boxSizing: 'border-box', lineHeight: 1.5, breakBefore: 'page' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: '14pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Standard Terms &amp; Conditions</div>
            <div style={{ fontSize: '8.5pt', color: '#777', marginTop: 3 }}>{COMPANY.legalName} &nbsp;|&nbsp; Quotation {meta.quoteNo}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="SealFix SA" style={{ height: 36, objectFit: 'contain' }} />
        </div>
        <div style={{ borderTop: '2px solid #e8a020', marginBottom: 16 }} />
        <div style={{ columnCount: 2, columnGap: '12mm', columnFill: 'balance' }}>
          {TERMS.map((term) => (
            <div key={term.heading} style={{ breakInside: 'avoid', marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: '9pt', marginBottom: 3 }}>{term.heading}</div>
              <div style={{ fontSize: '8.5pt', color: '#444', lineHeight: 1.55 }}>{term.body}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #ddd', paddingTop: 8, marginTop: 16, fontSize: '7.5pt', color: '#999', textAlign: 'center' }}>
          {COMPANY.legalName} &nbsp;·&nbsp; {COMPANY.address.streetAddress}, {COMPANY.address.addressLocality} {COMPANY.address.postalCode} &nbsp;·&nbsp; {COMPANY.phone}
        </div>
      </div>
    </div>
  );
}

// ─── QuoteGenerator ────────────────────────────────────────────────────────────

export function QuoteGenerator() {
  const [step, setStep] = useState<'build' | 'preview'>('build');

  const [client, setClient] = useState<ClientDetails>({ name: '', company: '', phone: '', email: '', address: '', siteAddress: '' });
  const [meta, setMeta] = useState<QuoteMeta>({ quoteNo: genQuoteNo(), date: today(), validUntil: addDays(30), poRef: '', notes: '', vatEnabled: true });
  const [lines, setLines] = useState<QuoteLine[]>([{ id: uid(), description: '', qty: 1, unit: 'each', unitPrice: 0 }]);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageCaption, setImageCaption] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [finalQuote, setFinalQuote] = useState<FinalQuote | null>(null);
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  // image
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setImageDataUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }
  function removeImage() {
    setImageDataUrl(null); setImageFileName(''); setImageCaption('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function setField(k: keyof ClientDetails, v: string) { setClient((p) => ({ ...p, [k]: v })); }

  const addLine = useCallback(() => setLines((p) => [...p, { id: uid(), description: '', qty: 1, unit: 'each', unitPrice: 0 }]), []);
  const removeLine = useCallback((id: string) => setLines((p) => p.filter((l) => l.id !== id)), []);
  const updateLine = useCallback(<K extends keyof QuoteLine>(id: string, key: K, val: QuoteLine[K]) => {
    setLines((p) => p.map((l) => (l.id === id ? { ...l, [key]: val } : l)));
  }, []);

  function applyPreset(label: string) {
    const preset = PRESETS.find((p) => p.label === label);
    if (!preset) return;
    setLines(preset.items.map((item) => ({ ...item, id: uid() })));
    setSelectedPreset('');
  }

  function goPreview() {
    setError('');
    if (!client.name.trim()) { setError('Client name is required.'); return; }
    if (lines.length === 0) { setError('Add at least one line item.'); return; }
    setFinalQuote({ meta: { ...meta }, client: { ...client }, lines: [...lines], imageDataUrl, imageCaption });
    setStep('preview');
  }

  const subtotal = lines.reduce((s, l) => s + lineAmount(l), 0);
  const vat = meta.vatEnabled ? subtotal * 0.15 : 0;
  const total = subtotal + vat;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #quote-document, #quote-document * { visibility: visible !important; }
          #quote-document { position: fixed !important; inset: 0 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* ── Step indicator ── */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setStep('build')}
          className={`flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors ${step === 'build' ? 'bg-ember-500 text-charcoal-900' : 'bg-charcoal-700 text-sand-400 hover:text-sand-200'}`}
        >
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${step === 'build' ? 'bg-charcoal-900 text-ember-400' : 'bg-charcoal-600 text-sand-400'}`}>1</span>
          Build Quote
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-charcoal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
        <button
          onClick={() => finalQuote && setStep('preview')}
          disabled={!finalQuote}
          className={`flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors ${step === 'preview' ? 'bg-ember-500 text-charcoal-900' : 'bg-charcoal-700 text-sand-400 hover:text-sand-200 disabled:opacity-40 disabled:cursor-not-allowed'}`}
        >
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${step === 'preview' ? 'bg-charcoal-900 text-ember-400' : 'bg-charcoal-600 text-sand-400'}`}>2</span>
          Preview & Print
        </button>
      </div>

      {/* ══ STEP 1: BUILD ══ */}
      {step === 'build' && (
        <div className="space-y-6">

          {/* Quote meta + Client — side by side */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quote details */}
            <div className={cardCls}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-sand-200 mb-4">Quote Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Quote No.</label>
                  <input className={inputCls} value={meta.quoteNo} onChange={(e) => setMeta((p) => ({ ...p, quoteNo: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Date</label>
                  <input className={inputCls} value={meta.date} onChange={(e) => setMeta((p) => ({ ...p, date: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Valid Until</label>
                  <input className={inputCls} value={meta.validUntil} onChange={(e) => setMeta((p) => ({ ...p, validUntil: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Client Ref / PO</label>
                  <input className={inputCls} placeholder="Optional" value={meta.poRef} onChange={(e) => setMeta((p) => ({ ...p, poRef: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Client details */}
            <div className={cardCls}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-sand-200 mb-4">Client Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Name *</label>
                  <input className={inputCls} value={client.name} onChange={(e) => setField('name', e.target.value)} placeholder="Full name" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>Company</label>
                  <input className={inputCls} value={client.company} onChange={(e) => setField('company', e.target.value)} placeholder="Optional" />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input className={inputCls} value={client.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="+27 …" />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} value={client.email} onChange={(e) => setField('email', e.target.value)} placeholder="email@…" />
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={cardCls}>
              <label className={labelCls}>Billing Address</label>
              <textarea className={inputCls + ' resize-none'} rows={3} value={client.address} onChange={(e) => setField('address', e.target.value)} placeholder={'Street\nCity, Province\nPostal Code'} />
            </div>
            <div className={cardCls}>
              <label className={labelCls}>Site / Project Address</label>
              <textarea className={inputCls + ' resize-none'} rows={3} value={client.siteAddress} onChange={(e) => setField('siteAddress', e.target.value)} placeholder="Where the work will be done" />
            </div>
          </div>

          {/* Line items */}
          <div className={cardCls}>
            <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
              <h3 className="text-sm font-bold uppercase tracking-wide text-sand-200">Line Items</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  className="rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm text-sand-300 focus:border-ember-500 focus:outline-none"
                  value={selectedPreset}
                  onChange={(e) => { setSelectedPreset(e.target.value); applyPreset(e.target.value); }}
                >
                  <option value="">Quick-add preset…</option>
                  {PRESETS.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
                </select>
                <button onClick={addLine} className="flex items-center gap-1.5 rounded border border-charcoal-600 bg-charcoal-700 px-3 py-2 text-sm font-semibold text-sand-200 hover:bg-charcoal-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M12 5v14M5 12h14" /></svg>
                  Add Line
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded border border-charcoal-700">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-charcoal-700 bg-charcoal-900/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sand-400 w-[40%]">Description</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-sand-400 w-[8%]">Qty</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sand-400 w-[12%]">Unit</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-sand-400 w-[16%]">Unit Price (R)</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-sand-400 w-[16%]">Amount</th>
                    <th className="px-3 py-3 w-[4%]" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-700">
                  {lines.map((line) => (
                    <tr key={line.id} className="group hover:bg-charcoal-700/30 transition-colors">
                      <td className="px-4 py-2.5">
                        <input className="w-full bg-transparent text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none" value={line.description} onChange={(e) => updateLine(line.id, 'description', e.target.value)} placeholder="e.g. Stop sign (R1) — supply & erect" />
                      </td>
                      <td className="px-3 py-2.5">
                        <input className="w-full bg-transparent text-sm text-right text-sand-100 focus:outline-none" type="number" min={0} step={1} value={line.qty} onChange={(e) => updateLine(line.id, 'qty', parseFloat(e.target.value) || 0)} />
                      </td>
                      <td className="px-3 py-2.5">
                        <input className="w-full bg-transparent text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none" value={line.unit} onChange={(e) => updateLine(line.id, 'unit', e.target.value)} placeholder="each" />
                      </td>
                      <td className="px-3 py-2.5">
                        <input className="w-full bg-transparent text-sm text-right text-sand-100 focus:outline-none" type="number" min={0} step={0.01} value={line.unitPrice} onChange={(e) => updateLine(line.id, 'unitPrice', parseFloat(e.target.value) || 0)} />
                      </td>
                      <td className="px-3 py-2.5 text-right text-sand-300 tabular-nums font-medium">{fmt(lineAmount(line))}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button onClick={() => removeLine(line.id)} className="text-sand-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all" title="Remove">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {lines.length === 0 && (
                <div className="py-10 text-center text-sm text-sand-500">No lines yet — click Add Line or choose a preset above.</div>
              )}
            </div>

            {/* Totals row */}
            <div className="mt-5 flex justify-end border-t border-charcoal-700 pt-4">
              <table className="text-sm border-collapse min-w-[260px]">
                <tbody>
                  <tr>
                    <td className="text-sand-400 pr-10 py-1.5">Subtotal (excl. VAT)</td>
                    <td className="text-right text-sand-100 tabular-nums font-medium">{fmt(subtotal)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-10">
                      <label className="flex items-center gap-2 cursor-pointer text-sand-400">
                        <input type="checkbox" checked={meta.vatEnabled} onChange={(e) => setMeta((p) => ({ ...p, vatEnabled: e.target.checked }))} className="accent-ember-500" />
                        VAT @ 15%
                      </label>
                    </td>
                    <td className="text-right text-sand-400 tabular-nums">{fmt(vat)}</td>
                  </tr>
                  <tr className="border-t border-charcoal-600">
                    <td className="pt-3 pr-10 font-bold text-sand-100 text-base">Total</td>
                    <td className="pt-3 text-right font-bold text-ember-400 tabular-nums text-lg">{fmt(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes + Image side by side */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={cardCls}>
              <label className={labelCls}>Notes (printed on quote)</label>
              <textarea className={inputCls + ' resize-none'} rows={4} value={meta.notes} onChange={(e) => setMeta((p) => ({ ...p, notes: e.target.value }))} placeholder="Scope clarifications, exclusions, site access requirements…" />
            </div>

            <div className={cardCls + ' space-y-3'}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-sand-200">Appendix Image</h3>
                <p className="text-xs text-sand-500 mt-1">Optional — printed as a separate Appendix A page.</p>
              </div>
              {imageDataUrl ? (
                <div className="space-y-3">
                  <div className="relative rounded overflow-hidden border border-charcoal-600">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageDataUrl} alt="Appendix preview" className="w-full max-h-36 object-contain bg-charcoal-900" />
                    <button onClick={removeImage} className="absolute top-2 right-2 rounded bg-charcoal-900/80 p-1.5 text-sand-300 hover:text-red-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-xs text-sand-500 truncate">{imageFileName}</p>
                  <div>
                    <label className={labelCls}>Caption (optional)</label>
                    <input className={inputCls} value={imageCaption} onChange={(e) => setImageCaption(e.target.value)} placeholder="e.g. Site photo — parking area" />
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-charcoal-600 py-8 text-sm text-sand-400 hover:border-ember-500 hover:text-sand-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  Click to attach image
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

          <button onClick={goPreview} className="w-full rounded bg-ember-500 py-3.5 text-base font-bold text-charcoal-900 hover:bg-ember-400 transition-colors">
            Preview Quote →
          </button>
        </div>
      )}

      {/* ══ STEP 2: PREVIEW ══ */}
      {step === 'preview' && finalQuote && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep('build')} className="flex items-center gap-2 rounded border border-charcoal-600 bg-charcoal-800 px-4 py-2 text-sm font-semibold text-sand-300 hover:bg-charcoal-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
                Back to Edit
              </button>
              <div>
                <p className="text-sm font-semibold text-sand-200">{finalQuote.meta.quoteNo}</p>
                <p className="text-xs text-sand-400">
                  {finalQuote.lines.length} line{finalQuote.lines.length !== 1 ? 's' : ''} &nbsp;·&nbsp; Valid until {finalQuote.meta.validUntil}
                  {finalQuote.imageDataUrl && <span> &nbsp;·&nbsp; + Appendix A</span>}
                </p>
              </div>
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 rounded bg-moss-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-moss-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 9V2h12v7" /><rect x="6" y="14" width="12" height="8" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              </svg>
              Print / Export PDF
            </button>
          </div>

          {/* Centred A4 preview */}
          <div className="overflow-auto rounded border border-charcoal-600 bg-white shadow-xl">
            <QuoteDocument q={finalQuote} />
          </div>
        </div>
      )}
    </>
  );
}
