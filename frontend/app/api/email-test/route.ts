import { NextResponse } from "next/server";
import { resend } from "@/lib/email/resend";

export async function GET() {
  try {
    const to = process.env.CONTACT_NOTIFICATION_EMAIL;

    if (!to) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing CONTACT_NOTIFICATION_EMAIL",
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Afilas Group <onboarding@resend.dev>",
      to: [to],
      subject: "Afilas Group Email Test",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h1 style="color: #071f46;">
            Afilas Group Email Test
          </h1>

          <p>
            This is a test email from the Afilas Group
            Next.js application.
          </p>

          <p style="color: #18a999;">
            Resend integration is working successfully.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Email test error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email.",
      },
      { status: 500 }
    );
  }
}