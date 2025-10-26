// Email service using Resend
// Install: npm install resend
// Set RESEND_API_KEY in .env

interface WellnessCheckEmailProps {
  userName: string;
  userEmail: string;
}

export async function sendWellnessCheckEmail({ userName, userEmail }: WellnessCheckEmailProps) {
  // For now, we'll use a simple fetch to simulate sending
  // In production, install and use Resend: npm install resend
  
  try {
    // If you have Resend API key, uncomment this:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Legacy <noreply@yourdomain.com>',
      to: userEmail,
      subject: '🌟 Your 30-Day Wellness Check from Legacy',
      html: getWellnessCheckEmailTemplate(userName),
    });
    */

    // For development, we'll just log
    console.log(`Would send wellness check email to: ${userEmail}`);
    console.log(`Template for: ${userName}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending wellness check email:', error);
    return { success: false, error };
  }
}

export function getWellnessCheckEmailTemplate(userName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: linear-gradient(135deg, #fff5f0 0%, #ffe8d9 100%);
      border-radius: 12px;
      padding: 30px;
      border: 2px solid #fb923c;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .content {
      background: white;
      padding: 25px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
      color: white;
      padding: 14px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 20px 0;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-top: 30px;
    }
    .emoji {
      font-size: 24px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏛️ Legacy</div>
      <h2 style="color: #f97316; margin: 0;">Your 30-Day Wellness Check</h2>
    </div>
    
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      
      <p class="emoji">👋</p>
      
      <p>We hope you're doing well! This is your regular 30-day wellness check-in from Legacy.</p>
      
      <p>As part of our commitment to ensuring your will and estate plans remain current and your loved ones are protected, we wanted to:</p>
      
      <ul style="line-height: 2; color: #555;">
        <li>✅ Confirm you're doing well</li>
        <li>📋 Check if any life changes need updating in your will</li>
        <li>🔒 Ensure your legacy remains secure</li>
        <li>💡 Remind you of the importance of keeping your will current</li>
      </ul>
      
      <p><strong>Have there been any changes?</strong></p>
      <p style="color: #666;">
        Consider updating your will if you've had:
        <br>• New assets or property
        <br>• Changes in family status
        <br>• Different beneficiary preferences
        <br>• Updated contact information
      </p>
      
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/will-builder" class="button">
          Review My Will →
        </a>
      </div>
      
      <p style="margin-top: 30px; color: #888; font-size: 14px;">
        <em>If everything is good, no action is needed. We'll check in again in 30 days.</em>
      </p>
    </div>
    
    <div class="footer">
      <p>This is an automated wellness check from Legacy.</p>
      <p>To stop receiving these emails, please update your preferences in your account settings.</p>
      <p style="margin-top: 20px;">© ${new Date().getFullYear()} Legacy. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

