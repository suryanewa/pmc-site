import { createHash } from 'crypto';

// Server-only Mailchimp helper
// Uses API key — NEVER import this file in client components

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
}

interface SubscribeParams {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  source?: string | null;
}

interface MailchimpErrorDetail {
  title?: string;
  detail?: string;
  status?: number;
}

export class MailchimpError extends Error {
  status: number;
  title: string;

  constructor(message: string, status: number, title: string) {
    super(message);
    this.name = 'MailchimpError';
    this.status = status;
    this.title = title;
  }
}

function getConfig(): MailchimpConfig {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    throw new Error(
      'Missing Mailchimp environment variables. Ensure MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and MAILCHIMP_AUDIENCE_ID are set.'
    );
  }

  return { apiKey, serverPrefix, audienceId };
}

function getSubscriberHash(email: string): string {
  return createHash('md5').update(email.toLowerCase().trim()).digest('hex');
}

/**
 * Subscribe or update a member in the Mailchimp audience.
 * Uses PUT (upsert) so existing members are updated without error.
 * New members get status "subscribed" (single opt-in).
 */
export async function subscribeToMailchimp({
  email,
  firstName,
  lastName,
  source,
}: SubscribeParams): Promise<void> {
  const config = getConfig();
  const subscriberHash = getSubscriberHash(email);

  const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash}`;

  const mergeFields: Record<string, string> = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;

  const body: Record<string, unknown> = {
    email_address: email.toLowerCase().trim(),
    status_if_new: 'subscribed',
  };

  if (Object.keys(mergeFields).length > 0) {
    body.merge_fields = mergeFields;
  }

  if (source) {
    body.tags = [source];
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as MailchimpErrorDetail;
    throw new MailchimpError(
      errorData.detail || 'Failed to subscribe to Mailchimp',
      response.status,
      errorData.title || 'Unknown Error'
    );
  }
}
