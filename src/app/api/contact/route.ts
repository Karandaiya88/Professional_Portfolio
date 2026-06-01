import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, inquiryType, subject, message } = body;

    // ── Validation ──
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // ── Email bhejo ──
    const { data, error } = await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>", 
      to:      ["karandaiya88@gmail.com"],                  
      replyTo: email,
      subject: `📩 New Contact: ${subject || "Portfolio Inquiry"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #030014; color: #f0f0f8; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
            .header { background: linear-gradient(135deg, #00f5ff20, #a855f720); border: 1px solid #00f5ff30; border-radius: 16px; padding: 28px; margin-bottom: 24px; text-align: center; }
            .logo { font-size: 28px; font-weight: 900; background: linear-gradient(135deg, #00f5ff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 6px; }
            .badge { display: inline-block; padding: 4px 14px; background: #00f5ff15; border: 1px solid #00f5ff30; border-radius: 99px; font-size: 11px; font-weight: 700; color: #00f5ff; letter-spacing: 0.1em; text-transform: uppercase; }
            .card { background: #ffffff08; border: 1px solid #ffffff12; border-radius: 14px; padding: 20px; margin-bottom: 14px; }
            .label { font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #00f5ff; margin-bottom: 6px; }
            .value { font-size: 15px; color: #f0f0f8; font-weight: 500; line-height: 1.6; }
            .message-box { background: #ffffff05; border: 1px solid #a855f730; border-radius: 14px; padding: 20px; border-left: 3px solid #a855f7; }
            .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #ffffff30; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">KD.</div>
              <p style="color:#ffffff60;font-size:13px;margin:6px 0 12px">Karan Daiya — Portfolio</p>
              <span class="badge">✉ New Message Received</span>
            </div>

            <div class="card">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>

            <div class="card">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color:#00f5ff;text-decoration:none">${email}</a></div>
            </div>

            ${inquiryType ? `
            <div class="card">
              <div class="label">Inquiry Type</div>
              <div class="value">${inquiryType}</div>
            </div>` : ""}

            ${subject ? `
            <div class="card">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>` : ""}

            <div class="message-box">
              <div class="label">Message</div>
              <div class="value" style="margin-top:8px">${message.replace(/\n/g, "<br/>")}</div>
            </div>

            <div class="footer">
              This message was sent from your portfolio's contact form 🚀<br/>
              To reply, simply email ${email}.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "There was an error sending the email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!", id: data?.id },
      { status: 200 }
    );

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
