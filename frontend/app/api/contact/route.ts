import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/email/resend";
import { createContactEmail } from "@/lib/email/contact-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      inquiry_type,
      subject,
      message,
    } = body;

    // Required fields
    if (
      !name ||
      !email ||
      !inquiry_type ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Validate name
    if (
      typeof name !== "string" ||
      name.trim().length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid name.",
        },
        { status: 400 }
      );
    }

    // Validate email
    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate subject
    if (
      typeof subject !== "string" ||
      subject.trim().length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid subject.",
        },
        { status: 400 }
      );
    }

    // Validate message
    if (
      typeof message !== "string" ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a longer message.",
        },
        { status: 400 }
      );
    }

    const notificationEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL;

    if (!notificationEmail) {
      console.error(
        "Missing CONTACT_NOTIFICATION_EMAIL"
      );

      return NextResponse.json(
        {
          success: false,
          message: "Email notification is not configured.",
        },
        { status: 500 }
      );
    }

    // Create the email HTML
    const html = createContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone:
        typeof phone === "string"
          ? phone.trim()
          : null,
      inquiryType: inquiry_type.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Afilas Group <onboarding@resend.dev>",
      to: [notificationEmail],
      //replyTo: email.trim(),
      subject: `New Contact Message: ${subject.trim()}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send your message.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}