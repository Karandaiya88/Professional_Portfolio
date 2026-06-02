// src/app/api/contact/route.ts
// Resend API — Email sending backend route

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

    // ── Send Email ──
    const { data, error } = await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>", // 🔁 Change after domain verify
      to:      ["karandaiya88@gmail.com"],                  // 🔁 Your real email here
      replyTo: email,
      subject: `📩 New Contact: ${subject || "Message from Portfolio"}`,
      html: `
        <!DOCTYPE html>
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>New Portfolio Message</title>
        </head>
        <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">

          <!-- Wrapper -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color:#0a0a0f;padding:40px 16px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="max-width:580px;">

                  <!-- ── BANNER / HEADER ── -->
                  <tr>
                    <td style="border-radius:20px 20px 0 0;overflow:hidden;
                      background:linear-gradient(135deg,#0d0d1a 0%,#1a0a2e 50%,#0a1a2e 100%);
                      border:1px solid rgba(0,245,255,0.2);border-bottom:none;
                      padding:0;">

                      <!-- Top neon line -->
                      <div style="height:3px;background:linear-gradient(90deg,#00f5ff,#a855f7,#f472b6);"></div>

                      <table width="100%" cellpadding="0" cellspacing="0" style="padding:36px 40px 28px;">
                        <tr>
                          <td>
                            <!-- Logo circle + name -->
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <!-- KD Avatar Circle -->
                                  <div style="width:64px;height:64px;border-radius:50%;
                                    background:linear-gradient(135deg,#00f5ff,#7c3aed);
                                    display:inline-flex;align-items:center;justify-content:center;
                                    font-size:22px;font-weight:900;color:#020010;
                                    text-align:center;line-height:64px;
                                    box-shadow:0 0 24px rgba(0,245,255,0.35);">
                                    KD
                                  </div>
                                </td>
                                <td style="padding-left:16px;vertical-align:middle;">
                                  <p style="margin:0;font-size:22px;font-weight:900;
                                    color:#f0f0f8;letter-spacing:-0.5px;">
                                    Karan Daiya
                                  </p>
                                  <p style="margin:4px 0 0;font-size:13px;
                                    color:rgba(240,240,248,0.5);">
                                    Full-Stack Developer &amp; AI Engineer
                                  </p>
                                </td>
                              </tr>
                            </table>

                            <!-- Divider -->
                            <div style="height:1px;background:rgba(255,255,255,0.08);margin:20px 0;"></div>

                            <!-- Badge + heading -->
                            <p style="margin:0 0 8px;">
                              <span style="display:inline-block;padding:4px 14px;
                                background:rgba(0,245,255,0.1);border:1px solid rgba(0,245,255,0.25);
                                border-radius:99px;font-size:10px;font-weight:800;color:#00f5ff;
                                letter-spacing:0.1em;text-transform:uppercase;">
                                ✉ New Message Received
                              </span>
                            </p>
                            <p style="margin:8px 0 0;font-size:26px;font-weight:800;
                              color:#f0f0f8;letter-spacing:-0.5px;">
                              Someone reached out! 🚀
                            </p>
                            <p style="margin:6px 0 0;font-size:13px;
                              color:rgba(240,240,248,0.45);">
                              Via karandaiya.vercel.app — Portfolio Contact Form
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- ── CONTENT BODY ── -->
                  <tr>
                    <td style="background:#0f0f1a;border:1px solid rgba(255,255,255,0.08);
                      border-top:none;border-bottom:none;padding:28px 40px;">

                      <!-- FROM -->
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="margin-bottom:14px;background:rgba(255,255,255,0.04);
                          border:1px solid rgba(255,255,255,0.09);border-radius:14px;">
                        <tr>
                          <td style="padding:16px 20px;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:800;
                              letter-spacing:0.12em;text-transform:uppercase;color:#00f5ff;">
                              From
                            </p>
                            <p style="margin:0;font-size:16px;font-weight:600;color:#f0f0f8;">
                              ${name}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- EMAIL -->
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="margin-bottom:14px;background:rgba(255,255,255,0.04);
                          border:1px solid rgba(255,255,255,0.09);border-radius:14px;">
                        <tr>
                          <td style="padding:16px 20px;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:800;
                              letter-spacing:0.12em;text-transform:uppercase;color:#00f5ff;">
                              Email
                            </p>
                            <a href="mailto:${email}"
                              style="font-size:15px;font-weight:600;color:#00f5ff;
                                text-decoration:none;">
                              ${email}
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- INQUIRY TYPE -->
                      ${inquiryType ? `
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="margin-bottom:14px;background:rgba(255,255,255,0.04);
                          border:1px solid rgba(255,255,255,0.09);border-radius:14px;">
                        <tr>
                          <td style="padding:16px 20px;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:800;
                              letter-spacing:0.12em;text-transform:uppercase;color:#a855f7;">
                              Inquiry Type
                            </p>
                            <p style="margin:0;font-size:15px;font-weight:600;color:#f0f0f8;">
                              ${inquiryType}
                            </p>
                          </td>
                        </tr>
                      </table>` : ""}

                      <!-- SUBJECT -->
                      ${subject ? `
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="margin-bottom:14px;background:rgba(255,255,255,0.04);
                          border:1px solid rgba(255,255,255,0.09);border-radius:14px;">
                        <tr>
                          <td style="padding:16px 20px;">
                            <p style="margin:0 0 4px;font-size:10px;font-weight:800;
                              letter-spacing:0.12em;text-transform:uppercase;color:#a855f7;">
                              Subject
                            </p>
                            <p style="margin:0;font-size:15px;font-weight:600;color:#f0f0f8;">
                              ${subject}
                            </p>
                          </td>
                        </tr>
                      </table>` : ""}

                      <!-- MESSAGE -->
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="background:rgba(168,85,247,0.06);
                          border:1px solid rgba(168,85,247,0.2);
                          border-left:3px solid #a855f7;
                          border-radius:14px;">
                        <tr>
                          <td style="padding:20px;">
                            <p style="margin:0 0 8px;font-size:10px;font-weight:800;
                              letter-spacing:0.12em;text-transform:uppercase;color:#a855f7;">
                              Message
                            </p>
                            <p style="margin:0;font-size:15px;color:rgba(240,240,248,0.8);
                              line-height:1.75;">
                              ${message.replace(/\n/g, "<br/>")}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Reply CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="margin-top:24px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: ${subject || 'Your Portfolio Message'}"
                              style="display:inline-block;padding:14px 36px;
                                background:linear-gradient(135deg,#00f5ff,#7c3aed);
                                border-radius:99px;font-size:14px;font-weight:800;
                                color:#020010;text-decoration:none;letter-spacing:0.03em;">
                              Reply to ${name} →
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- ── FOOTER ── -->
                  <tr>
                    <td style="background:#0a0a12;border:1px solid rgba(255,255,255,0.07);
                      border-top:none;border-radius:0 0 20px 20px;padding:24px 40px;">

                      <!-- Links row -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-bottom:16px;">
                            <a href="https://karandaiya.vercel.app"
                              style="color:rgba(240,240,248,0.4);font-size:12px;
                                text-decoration:none;margin:0 12px;">
                              Portfolio
                            </a>
                            <a href="https://github.com/Karandaiya88"
                              style="color:rgba(240,240,248,0.4);font-size:12px;
                                text-decoration:none;margin:0 12px;">
                              GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/karan-d88/"
                              style="color:rgba(240,240,248,0.4);font-size:12px;
                                text-decoration:none;margin:0 12px;">
                              LinkedIn
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <p style="margin:0;font-size:11px;
                              color:rgba(240,240,248,0.25);line-height:1.6;">
                              © 2025 Karan Daiya · Jodhpur, India<br/>
                              This email was sent from your portfolio contact form.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
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
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}