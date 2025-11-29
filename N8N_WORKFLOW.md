# n8n Workflow Integration - Wellness Check System

## Overview

Legacy includes an automated wellness check system powered by n8n workflows that sends weekly email reminders to users. This feature enhances the will management platform by ensuring users regularly verify their status and update their wills as needed.

## Feature Description

### Monthly Wellness Check
- **Frequency**: Weekly email reminders (configurable via n8n)
- **Purpose**: Verify user status and prompt will updates
- **User Action**: Simple reply to confirm they're okay or update their will
- **Automated Response**: If no response received, system can trigger beneficiary notifications

## n8n Workflow Architecture

### Workflow Components

1. **Scheduler Trigger**
   - Weekly cron job (every 7 days)
   - Configurable timing

2. **User Query**
   - Fetches users with active wills
   - Filters by last wellness check date
   - Identifies users due for check-in

3. **Email Generation**
   - Personalized email template
   - Includes will summary
   - Provides update link
   - Reply-to functionality

4. **Response Handling**
   - Monitors email replies
   - Updates user status in database
   - Logs wellness check responses

5. **Escalation Logic** (Future)
   - If no response after X days
   - Notify beneficiaries
   - Trigger will execution process


## How It Enhances the Platform

### 1. **Proactive User Engagement**
- Keeps users engaged with their wills
- Encourages regular updates
- Maintains accurate information

### 2. **Safety Mechanism**
- Detects inactive users
- Triggers beneficiary notifications if needed
- Ensures wills remain current

### 3. **Real-World Utility**
- Solves practical problem (forgotten wills)
- Demonstrates automation capabilities
- Shows production-ready features

## Potential Somnia Integration

### Future Enhancement: Real-Time Notifications via Data Streams

The wellness check system could be enhanced to use Somnia Data Streams for:

1. **Real-Time Status Updates**
   ```typescript
   // Publish wellness check status to Somnia
   await sdk.streams.set([{
     id: wellnessCheckId,
     schemaId: wellnessSchemaId,
     data: {
       userId: user.id,
       checkDate: new Date(),
       status: "sent" | "responded" | "no_response",
       timestamp: Date.now()
     }
   }]);
   ```

2. **Beneficiary Notifications**
   - Publish notification events to blockchain
   - Enable real-time beneficiary alerts
   - Immutable notification history

3. **Automated Will Execution**
   - Trigger will distribution based on stream events
   - Real-time status monitoring
   - Transparent execution process

## Workflow Diagram

```
n8n Scheduler (Weekly)
    ↓
Query Active Users
    ↓
Generate Personalized Emails
    ↓
Send via SMTP
    ↓
Monitor Replies
    ↓
Update Database
    ↓
[If No Response] → Notify Beneficiaries (Future)
```

## Configuration

### n8n Workflow Settings
- **Schedule**: Weekly (configurable)
- **Email Template**: Customizable
- **Response Window**: 7 days (configurable)
- **Escalation**: After 14 days (future)

---

