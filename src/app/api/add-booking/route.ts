import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {
  MEETING_DURATION_MINUTES,
  addMinutesToSlotHHmm,
  bookingDateMessage,
  formatSlotDisplay12h,
  parseLocalYMD,
  slotsForSelectedDate,
} from "@/lib/booking-schedule";
import { sendBookingEmails } from "@/lib/mail/send-booking-emails";

export const BOOKINGS_COLLECTION_NAME =
  process.env.MONGO_BOOKINGS_COLLECTION?.trim() || "bookings";

export type BookingDocument = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  time12h: string;
  meetingEnds12h: string;
  durationMinutes: number;
  notes: string;
  appointmentAt: Date;
  createdAt: Date;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
      return NextResponse.json(
        { message: "Database is not configured.", success: false },
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

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body.", success: false },
        { status: 400 }
      );
    }

    const o = body as Record<string, unknown>;
    const name = typeof o.name === "string" ? o.name.trim() : "";
    const emailRaw = typeof o.email === "string" ? o.email.trim() : "";
    const email = emailRaw.toLowerCase();
    const phone = typeof o.phone === "string" ? o.phone.trim() : "";
    const date = typeof o.date === "string" ? o.date.trim() : "";
    const time = typeof o.time === "string" ? o.time.trim() : "";
    const notes = typeof o.notes === "string" ? o.notes.trim() : "";

    if (name.length < 2 || name.length > 200) {
      return NextResponse.json(
        { message: "Please enter a valid name.", success: false },
        { status: 400 }
      );
    }
    if (!isValidEmail(email) || email.length > 120) {
      return NextResponse.json(
        { message: "Please enter a valid email.", success: false },
        { status: 400 }
      );
    }
    if (phone.length < 8 || phone.length > 40) {
      return NextResponse.json(
        { message: "Please enter a valid phone number.", success: false },
        { status: 400 }
      );
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { message: "Invalid date format.", success: false },
        { status: 400 }
      );
    }
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      return NextResponse.json(
        { message: "Invalid time format.", success: false },
        { status: 400 }
      );
    }
    if (notes.length > 2000) {
      return NextResponse.json(
        { message: "Agenda is too long.", success: false },
        { status: 400 }
      );
    }

    const dateMsg = bookingDateMessage(date);
    if (dateMsg) {
      return NextResponse.json(
        { message: dateMsg, success: false },
        { status: 400 }
      );
    }

    const allowedSlots = slotsForSelectedDate(date);
    if (!allowedSlots.includes(time)) {
      return NextResponse.json(
        {
          message: "This time slot is not available for the selected date.",
          success: false,
        },
        { status: 400 }
      );
    }

    const durationMinutes = MEETING_DURATION_MINUTES;
    const endHhmm = addMinutesToSlotHHmm(time, durationMinutes);
    const time12h = formatSlotDisplay12h(time, "en-US");
    const meetingEnds12h = formatSlotDisplay12h(endHhmm, "en-US");

    const appointmentAt = parseLocalYMD(date);
    const [hh, mm] = time.split(":").map((x) => parseInt(x, 10));
    appointmentAt.setHours(hh, mm, 0, 0);

    const doc: BookingDocument = {
      name,
      email,
      phone,
      notes,
      date,
      time,
      time12h,
      meetingEnds12h,
      durationMinutes,
      appointmentAt,
      createdAt: new Date(),
    };

    const collection = dbConnect<BookingDocument>(BOOKINGS_COLLECTION_NAME);
    const taken = await collection.findOne({ date, time });
    if (taken) {
      return NextResponse.json(
        {
          message: "This slot is already booked. Pick another time.",
          success: false,
        },
        { status: 409 }
      );
    }

    const result = await collection.insertOne(doc);
    if (!result.insertedId) {
      return NextResponse.json(
        { message: "Failed to save booking.", success: false },
        { status: 500 }
      );
    }

    try {
      await sendBookingEmails({
        name,
        email,
        phone,
        date,
        time,
        time12h,
        meetingEnds12h,
        durationMinutes,
        notes,
        appointmentAtIso: appointmentAt.toISOString(),
      });
    } catch (mailErr) {
      console.error("Booking saved but email failed:", mailErr);
    }

    return NextResponse.json(
      {
        message: "Booking saved successfully. I will confirm shortly.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in booking API:", error);
    return NextResponse.json(
      { message: "Failed to save booking.", success: false },
      { status: 500 }
    );
  }
}
