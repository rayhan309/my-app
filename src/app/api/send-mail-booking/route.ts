import { NextResponse } from "next/server";
import { parseBookingMailBody } from "@/lib/mail/booking-templates";
import { sendBookingEmails } from "@/lib/mail/send-booking-emails";

export async function POST(request: Request) {
  try {
    const mailUser = process.env.MAIL_APP_NAME;
    const mailPass = process.env.MAIL_APP_PASS;
    const inboxTo = process.env.CONTACT_TO_EMAIL ?? process.env.MY_EMAIL;

    if (!mailUser || !mailPass || !inboxTo) {
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
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body.", success: false },
        { status: 400 }
      );
    }

    const data = parseBookingMailBody(body);
    if (!data) {
      return NextResponse.json(
        { message: "Invalid or incomplete booking mail payload.", success: false },
        { status: 400 }
      );
    }

    await sendBookingEmails(data);

    return NextResponse.json(
      { message: "Booking emails sent successfully.", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("send-mail-booking:", error);
    return NextResponse.json(
      { message: "Failed to send booking emails.", success: false },
      { status: 500 }
    );
  }
}
