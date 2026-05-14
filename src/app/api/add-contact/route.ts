import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  adminNotificationHtml,
  adminNotificationText,
  userConfirmationHtml,
  userConfirmationText,
  type ContactMailFields,
} from "@/lib/mail/contact-templates";

function parseBody(body: unknown): ContactMailFields | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const subject = typeof o.subject === "string" ? o.subject.trim() : "";
  const description =
    typeof o.description === "string" ? o.description.trim() : "";

  if (
    name.length < 2 ||
    email.length < 5 ||
    phone.length < 8 ||
    subject.length < 1 ||
    description.length < 10
  ) {
    return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (
    name.length > 200 ||
    subject.length > 200 ||
    description.length > 8000 ||
    phone.length > 40
  ) {
    return null;
  }

  return { name, email, phone, subject, description };
}

export async function POST(req: Request) {
  try {
    const mailUser = process.env.MAIL_APP_NAME;
    const mailPass = process.env.MAIL_APP_PASS;
    const inboxTo = process.env.CONTACT_TO_EMAIL ?? process.env.MY_EMAIL;

    if (!mailUser || !mailPass || !inboxTo) {
      console.error(
        "Missing MAIL_APP_NAME, MAIL_APP_PASS, or CONTACT_TO_EMAIL / MY_EMAIL"
      );
      return NextResponse.json(
        {
          message: "Email is not configured on the server.",
          success: false,
        },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body.", success: false },
        { status: 400 }
      );
    }

    const data = parseBody(body);
    if (!data) {
      return NextResponse.json(
        { message: "Invalid or incomplete form data.", success: false },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const fromName = process.env.MAIL_FROM_NAME ?? "Abu Rayhan";
    const fromAddr = `${fromName} <${mailUser}>`;

    await transporter.sendMail({
      from: fromAddr,
      to: inboxTo,
      replyTo: data.email,
      subject: `New inquiry: ${data.subject} — ${data.name}`,
      text: adminNotificationText(data),
      html: adminNotificationHtml(data),
    });

    await transporter.sendMail({
      from: fromAddr,
      to: data.email,
      subject: `We received your message — ${data.subject}`,
      text: userConfirmationText(data),
      html: userConfirmationHtml(data),
    });

    return NextResponse.json(
      {
        message:
          "Message sent successfully. A confirmation email has been sent to you.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      {
        message: "Could not send email. Please try again later.",
        success: false,
      },
      { status: 500 }
    );
  }
}
