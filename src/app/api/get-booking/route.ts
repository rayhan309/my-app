import { NextResponse } from "next/server";
import type { WithId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import {
  BOOKINGS_COLLECTION_NAME,
  type BookingDocument,
} from "../add-booking/route";
import {
  BOOKING_LIST_CALENDAR_TZ,
  getTodayYmdInTimeZone,
} from "@/lib/booking-schedule";

function resolveMinDate(searchParams: URLSearchParams): string {
  const raw = searchParams.get("minDate")?.trim();
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }
  return getTodayYmdInTimeZone(BOOKING_LIST_CALENDAR_TZ);
}

function serializeBooking(b: WithId<BookingDocument>) {
  return {
    _id: b._id.toString(),
    name: b.name,
    email: b.email,
    phone: b.phone,
    notes: b.notes,
    date: b.date,
    time: b.time,
    time12h: b.time12h,
    meetingEnds12h: b.meetingEnds12h,
    durationMinutes: b.durationMinutes,
    appointmentAt:
      b.appointmentAt instanceof Date
        ? b.appointmentAt.toISOString()
        : b.appointmentAt,
    createdAt:
      b.createdAt instanceof Date
        ? b.createdAt.toISOString()
        : b.createdAt,
  };
}

export async function GET(req: Request) {
  try {
    if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
      return NextResponse.json(
        { bookings: [], message: "Database is not configured.", success: false },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const minDate = resolveMinDate(searchParams);

    const collection = dbConnect<BookingDocument>(BOOKINGS_COLLECTION_NAME);
    const rows = await collection
      .find({ date: { $gte: minDate } })
      .sort({ date: 1, time: 1 })
      .toArray();

    const bookings = rows.map(serializeBooking);

    return NextResponse.json({ bookings, success: true });
  } catch (error) {
    console.error(error, "Failed to get bookings.");
    return NextResponse.json(
      { message: "Failed to get bookings.", success: false, bookings: [] },
      { status: 500 }
    );
  }
}
