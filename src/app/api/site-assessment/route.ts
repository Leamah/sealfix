import { NextRequest, NextResponse } from 'next/server';
import { siteAssessmentSchema, type SiteAssessmentAttachment } from '@/lib/content/site-assessment-validator';
import { appendLeadToSheet } from '@/lib/sheets';
import { sendSiteAssessmentNotification } from '@/lib/brevo';
import { randomUUID } from 'crypto';

const MAX_ATTACHMENTS_BYTES = 3 * 1024 * 1024; // 3MB combined, base64-encoded

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { attachments, ...fields } = body as { attachments?: SiteAssessmentAttachment[] } & Record<string, unknown>;

  const parsed = siteAssessmentSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  let safeAttachments: SiteAssessmentAttachment[] | undefined;
  if (Array.isArray(attachments) && attachments.length > 0) {
    const totalBytes = attachments.reduce((sum, a) => sum + (a.content?.length ?? 0), 0);
    if (totalBytes <= MAX_ATTACHMENTS_BYTES) {
      safeAttachments = attachments.slice(0, 5);
    }
  }

  const submission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };

  console.log('[SITE-ASSESSMENT]', JSON.stringify({ ...submission, attachments: safeAttachments?.length ?? 0 }, null, 2));

  try {
    await appendLeadToSheet([
      submission.id,
      submission.createdAt,
      submission.name,
      submission.company ?? '',
      submission.phone,
      submission.email,
      submission.siteLocation,
      submission.province,
      submission.projectType,
      submission.serviceRequired,
      submission.approximateSize ?? '',
      submission.surfaceCondition ?? '',
      submission.preferredVisitDate ?? '',
      submission.urgency,
      submission.message ?? '',
      String(safeAttachments?.length ?? 0),
    ]);
  } catch (err) {
    console.error('[SITE-ASSESSMENT] Google Sheets write failed:', err);
  }

  try {
    await sendSiteAssessmentNotification(submission, safeAttachments);
  } catch (err) {
    console.error('[SITE-ASSESSMENT] Brevo email failed:', err);
  }

  return NextResponse.json({ success: true, id: submission.id });
}
