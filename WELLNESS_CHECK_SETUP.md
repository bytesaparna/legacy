# 30-Day Wellness Check Email System Setup Guide

## Overview
This system automatically sends wellness check emails to users every 30 days to ensure their will information stays current and they're doing well.

## Features
✅ Automatic 30-day wellness check emails  
✅ User preference management (enable/disable)  
✅ Beautiful email templates with orange branding  
✅ Cron job integration with Vercel  
✅ Progress tracking for next wellness check  

---

## 1. Database Setup

### Run Prisma Migration
```bash
npx prisma migrate dev --name add_wellness_check
npx prisma generate
```

This adds:
- `lastWellnessCheck` (DateTime?) - Tracks the last check date
- `wellnessCheckEnabled` (Boolean) - User preference (default: true)

---

## 2. Email Service Setup (Resend)

### Install Resend
```bash
npm install resend
```

### Get API Key
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your domain (or use their test domain for development)

### Update `.env`
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CRON_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Update Email Service (`src/lib/email.ts`)
Uncomment the Resend code:
```typescript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Legacy <noreply@yourdomain.com>',
  to: userEmail,
  subject: '🌟 Your 30-Day Wellness Check from Legacy',
  html: getWellnessCheckEmailTemplate(userName),
});
```

---

## 3. Cron Job Setup

### For Vercel (Recommended)
The `vercel.json` is already configured:
```json
{
  "crons": [
    {
      "path": "/api/cron/wellness-check",
      "schedule": "0 9 * * *"
    }
  ]
}
```
This runs daily at 9 AM UTC.

**Note:** Vercel Cron is only available on Pro plans or higher.

### For Other Platforms
Use external cron services:

#### Option A: EasyCron
1. Sign up at [easycron.com](https://www.easycron.com)
2. Create a cron job:
   - URL: `https://yourdomain.com/api/cron/wellness-check`
   - Schedule: `0 9 * * *` (daily at 9 AM)
   - Header: `Authorization: Bearer your-cron-secret`

#### Option B: Cron-job.org
1. Sign up at [cron-job.org](https://cron-job.org)
2. Create a job:
   - URL: `https://yourdomain.com/api/cron/wellness-check`
   - Schedule: Daily at 9:00 AM
   - Add header: `Authorization: Bearer your-cron-secret`

---

## 4. Testing

### Test the Email Template
```bash
# Create a test file
node -e "const { getWellnessCheckEmailTemplate } = require('./src/lib/email'); console.log(getWellnessCheckEmailTemplate('Test User'));"
```

### Test the Cron Endpoint Locally
```bash
curl -X GET http://localhost:3000/api/cron/wellness-check \
  -H "Authorization: Bearer your-cron-secret"
```

### Test in Production
```bash
curl -X GET https://yourdomain.com/api/cron/wellness-check \
  -H "Authorization: Bearer your-cron-secret"
```

---

## 5. User Interface Integration

### Add to Settings/Profile Page
```tsx
import { WellnessCheckSettings } from "@/components/wellness-check-settings"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <WellnessCheckSettings />
    </div>
  )
}
```

---

## 6. How It Works

### Flow:
1. **Daily Cron Job** runs at 9 AM UTC
2. **Queries Database** for users who:
   - Haven't been checked in 30+ days OR never checked
   - Have wellness checks enabled
   - Have at least one completed will
3. **Sends Emails** to qualifying users
4. **Updates Database** with new `lastWellnessCheck` timestamp
5. **Returns Results** with success/failure status

### User Experience:
1. User creates a will → `lastWellnessCheck` is set to now
2. After 30 days → User receives wellness check email
3. User can review/update their will via email link
4. Cycle repeats every 30 days
5. User can disable anytime via settings

---

## 7. Email Customization

### Update Email Template
Edit `src/lib/email.ts` → `getWellnessCheckEmailTemplate()`

### Customize Schedule
Edit `vercel.json`:
- Every day: `0 9 * * *`
- Every Monday: `0 9 * * 1`
- Every 2 weeks: `0 9 */14 * *`

---

## 8. Monitoring

### Check Cron Logs (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Navigate to "Logs"
4. Filter by `/api/cron/wellness-check`

### Database Queries
```sql
-- Users with wellness checks enabled
SELECT * FROM "User" WHERE "wellnessCheckEnabled" = true;

-- Users needing checks
SELECT * FROM "User" 
WHERE "wellnessCheckEnabled" = true 
AND ("lastWellnessCheck" IS NULL OR "lastWellnessCheck" < NOW() - INTERVAL '30 days');

-- Check history
SELECT 
  name, 
  email, 
  "lastWellnessCheck",
  AGE(NOW(), "lastWellnessCheck") as time_since_check
FROM "User"
ORDER BY "lastWellnessCheck" DESC;
```

---

## 9. Troubleshooting

### Emails Not Sending
- ✅ Check `RESEND_API_KEY` is set
- ✅ Verify domain in Resend dashboard
- ✅ Check Resend logs for errors
- ✅ Ensure "from" email matches verified domain

### Cron Not Running
- ✅ Verify `vercel.json` is in project root
- ✅ Check Vercel plan (Pro required for cron)
- ✅ Verify cron is enabled in Vercel dashboard
- ✅ Check `CRON_SECRET` matches

### Users Not Receiving Emails
- ✅ Check `wellnessCheckEnabled` is true
- ✅ Verify user has completed will
- ✅ Check `lastWellnessCheck` date
- ✅ Ensure email address is valid

---

## 10. Security Considerations

1. **Cron Secret**: Always use a strong `CRON_SECRET`
2. **Rate Limiting**: Consider adding rate limits to the cron endpoint
3. **Email Validation**: Validate email addresses before sending
4. **Privacy**: Never include sensitive will details in emails
5. **Unsubscribe**: Provide easy way to disable (via settings)

---

## Support

For issues or questions:
1. Check the console logs
2. Review Prisma migrations
3. Test email template rendering
4. Verify environment variables

---

**Last Updated:** ${new Date().toISOString().split('T')[0]}

