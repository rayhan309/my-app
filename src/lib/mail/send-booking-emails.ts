import nodemailer from "nodemailer";
import {
  bookingAdminHtml,
  bookingAdminText,
  bookingUserHtml,
  bookingUserText,
  type BookingMailPayload,
} from "@/lib/mail/booking-templates";

export async function sendBookingEmails(
  data: BookingMailPayload
): Promise<void> {
  const mailUser = process.env.MAIL_APP_NAME;
  const mailPass = process.env.MAIL_APP_PASS;
  const inboxTo = process.env.CONTACT_TO_EMAIL ?? process.env.MY_EMAIL;

  if (!mailUser || !mailPass || !inboxTo) {
    throw new Error(
      "Missing MAIL_APP_NAME, MAIL_APP_PASS, or CONTACT_TO_EMAIL / MY_EMAIL"
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
    subject: `New booking: ${data.date} · ${data.time12h} — ${data.name}`,
    text: bookingAdminText(data),
    html: bookingAdminHtml(data),
  });

  await transporter.sendMail({
    from: fromAddr,
    to: data.email,
    subject: `Booking confirmed — ${data.date} at ${data.time12h}`,
    text: bookingUserText(data),
    html: bookingUserHtml(data),
  });
}
