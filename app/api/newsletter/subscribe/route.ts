import { NextRequest, NextResponse } from 'next/server';
import { subscribeToMailchimp, MailchimpError } from '@/lib/mailchimp/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, source } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await subscribeToMailchimp({
      email: normalizedEmail,
      firstName: firstName?.trim() || null,
      lastName: lastName?.trim() || null,
      source: source || null,
    });

    // Supabase backup — fire-and-forget, don't block on failure
    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from('newsletter_subscribers')
        .upsert(
          {
            email: normalizedEmail,
            first_name: firstName?.trim() || null,
            last_name: lastName?.trim() || null,
            source: source || null,
          },
          {
            onConflict: 'email',
            ignoreDuplicates: true,
          }
        );
    } catch {
      // no-op
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscribe error:', error);

    if (error instanceof MailchimpError) {
      if (error.title === 'Member Exists') {
        return NextResponse.json(
          { success: true, message: 'You\'re already subscribed!' },
          { status: 200 }
        );
      }

      if (error.title === 'Invalid Resource') {
        return NextResponse.json(
          { error: 'Invalid email address. Please check and try again.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    const message =
      error instanceof Error && error.message.includes('Missing Mailchimp')
        ? 'Newsletter service is not configured.'
        : 'An unexpected error occurred';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
