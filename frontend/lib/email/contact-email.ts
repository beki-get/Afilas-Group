interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  inquiryType: string;
  subject: string;
  message: string;
}

export function createContactEmail({
  name,
  email,
  phone,
  inquiryType,
  subject,
  message,
}: ContactEmailData) {
  return `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background-color: #f4f8fc;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <div style="
        max-width: 650px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
      ">

        <!-- Header -->
        <div style="
          background: #071f46;
          padding: 28px 32px;
        ">
          <div style="
            color: #35d0bd;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
          ">
            AFILAS GROUP
          </div>

          <h1 style="
            margin: 10px 0 0;
            color: #ffffff;
            font-size: 26px;
          ">
            New Contact Message
          </h1>
        </div>

        <!-- Content -->
        <div style="padding: 32px;">

          <p style="
            margin-top: 0;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          ">
            A visitor has submitted a new message through
            the Afilas Group contact form.
          </p>

          <!-- Contact Information -->
          <div style="
            margin-top: 24px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
          ">

            <h2 style="
              margin: 0 0 16px;
              color: #071f46;
              font-size: 17px;
            ">
              Contact Information
            </h2>

            <p style="margin: 8px 0; color: #374151;">
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p style="margin: 8px 0; color: #374151;">
              <strong>Email:</strong>
              <a
                href="mailto:${escapeHtml(email)}"
                style="color: #128f83;"
              >
                ${escapeHtml(email)}
              </a>
            </p>

            <p style="margin: 8px 0; color: #374151;">
              <strong>Phone:</strong>
              ${phone ? escapeHtml(phone) : "Not provided"}
            </p>

            <p style="margin: 8px 0; color: #374151;">
              <strong>Inquiry:</strong>
              ${escapeHtml(inquiryType)}
            </p>

          </div>

          <!-- Subject -->
          <div style="margin-top: 24px;">

            <h2 style="
              color: #071f46;
              font-size: 17px;
              margin-bottom: 12px;
            ">
              Subject
            </h2>

            <p style="
              color: #374151;
              font-weight: 600;
            ">
              ${escapeHtml(subject)}
            </p>

          </div>

          <!-- Message -->
          <div style="margin-top: 24px;">

            <h2 style="
              color: #071f46;
              font-size: 17px;
              margin-bottom: 12px;
            ">
              Message
            </h2>

            <div style="
              padding: 18px;
              background: #f8fafc;
              border-left: 4px solid #18a999;
              border-radius: 8px;
              color: #374151;
              line-height: 1.7;
              white-space: pre-wrap;
            ">
              ${escapeHtml(message)}
            </div>

          </div>

        </div>

        <!-- Footer -->
        <div style="
          padding: 20px 32px;
          background: #071f46;
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          text-align: center;
        ">
          Afilas Group Healthcare • Diagnostics • Manufacturing
        </div>

      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}