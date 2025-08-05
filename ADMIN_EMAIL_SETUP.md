# Admin Email Notifications Setup

## Overview
When someone joins the MentoLoop waitlist, the system now automatically sends:
1. **Welcome email** to the user who signed up
2. **Admin notification** to admin@mentoloop.com with signup details

## Environment Variables Required

Add this to your Netlify environment variables:

```bash
ADMIN_EMAIL=admin@mentoloop.com
```

If not set, it defaults to `admin@mentoloop.com`.

## What the Admin Email Contains

- **Name**: Full name of the person who signed up
- **Email**: Their email address (clickable mailto link)
- **Role**: Student, Preceptor, or School (styled with colored badge)
- **Referral Source**: How they heard about MentoLoop
- **Timestamp**: When they signed up (EST timezone)
- **Direct link**: To view details in Supabase dashboard

## Implementation Details

### Email Sending Strategy
- **Parallel processing**: Both emails sent simultaneously for speed
- **Graceful degradation**: If admin email fails, user signup still succeeds
- **Critical path**: Welcome email failure will cause signup to fail
- **Logging**: All results logged to Netlify function logs

### Email Template
- Clean, professional design
- Mobile-friendly responsive layout
- Matches MentoLoop branding
- Clear action items for admin

### Testing
Use the `test-admin-email.html` file to test the functionality:
1. Open the test file in your browser
2. Fill out the form with test data
3. Submit to test both email types
4. Check Netlify function logs for detailed results

## Files Modified
- `netlify/functions/send-email.js` - Added admin notification template and parallel sending
- `src/components/WaitlistForm.tsx` - No changes needed (already calls the email function)
- `src/services/sendgrid.ts` - No changes needed (already calls the email function)

## Monitoring
Check your Netlify function logs to monitor:
- Email delivery success/failure rates
- Any SendGrid API errors
- Admin notification delivery status

## Future Enhancements
- Multiple admin email recipients
- Batched notifications (e.g., daily digest)
- Admin dashboard instead of emails
- Slack/Discord integration
- Role-based admin routing