import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { sendWellnessCheckEmail } from "@/lib/email";

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Max execution time in seconds

export async function GET(request: Request) {
  try {
    // Verify the request is from a cron job (add your cron secret)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find users who need wellness checks:
    // 1. Haven't been checked in 30+ days OR never been checked
    // 2. Have wellness checks enabled
    // 3. Have at least one completed will
    const usersNeedingCheck = await prisma.user.findMany({
      where: {
        wellnessCheckEnabled: true,
        OR: [
          { lastWellnessCheck: null },
          { lastWellnessCheck: { lte: thirtyDaysAgo } }
        ],
        wills: {
          some: {
            status: 'completed'
          }
        }
      },
      include: {
        wills: {
          where: {
            status: 'completed'
          },
          take: 1
        }
      }
    });

    console.log(`Found ${usersNeedingCheck.length} users needing wellness check`);

    const results = [];

    // Send wellness check emails
    for (const user of usersNeedingCheck) {
      try {
        // Send email
        const emailResult = await sendWellnessCheckEmail({
          userName: user.name,
          userEmail: user.email,
        });

        if (emailResult.success) {
          // Update last wellness check date
          await prisma.user.update({
            where: { id: user.id },
            data: { lastWellnessCheck: new Date() }
          });

          results.push({
            userId: user.id,
            email: user.email,
            status: 'sent'
          });
        } else {
          results.push({
            userId: user.id,
            email: user.email,
            status: 'failed',
            error: emailResult.error
          });
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
        results.push({
          userId: user.id,
          email: user.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${usersNeedingCheck.length} users`,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Wellness check cron error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

