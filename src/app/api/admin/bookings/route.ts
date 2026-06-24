import { NextResponse } from "next/server";
import { ObjectId, type WithId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { requireAdmin } from "@/lib/admin-auth";
import {
  BOOKINGS_COLLECTION_NAME,
  type BookingDocument,
} from "@/app/api/add-booking/route";

export type AdminBookingRow = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  date: string;
  time: string;
  time12h: string;
  meetingEnds12h: string;
  durationMinutes: number;
  appointmentAt: string;
  createdAt: string;
  marked: boolean;
};

function serializeBooking(b: WithId<BookingDocument>): AdminBookingRow {
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
        : String(b.appointmentAt),
    createdAt:
      b.createdAt instanceof Date
        ? b.createdAt.toISOString()
        : String(b.createdAt),
    marked: Boolean(b.marked),
  };
}

export async function GET(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    if (
      !process.env.MONGO_DB_URI?.trim() ||
      !process.env.MONGO_DB_NAME?.trim()
    ) {
      return NextResponse.json(
        { bookings: [], message: "Database is not configured.", success: false },
        { status: 503 }
      );
    }

    const collection = dbConnect<BookingDocument>(BOOKINGS_COLLECTION_NAME);
    const rows = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const bookings = rows.map(serializeBooking);
    const now = new Date();
    const upcoming = bookings.filter(
      (b) => new Date(b.appointmentAt).getTime() >= now.getTime()
    );
    const marked = bookings.filter((b) => b.marked).length;

    return NextResponse.json({
      success: true,
      bookings,
      stats: {
        total: bookings.length,
        upcoming: upcoming.length,
        past: bookings.length - upcoming.length,
        marked,
      },
    });
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json(
      { message: "Failed to load bookings.", success: false, bookings: [] },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const o = body as Record<string, unknown>;
    const id = typeof o.id === "string" ? o.id.trim() : "";
    const marked = o.marked;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Valid booking id is required." },
        { status: 400 }
      );
    }

    if (typeof marked !== "boolean") {
      return NextResponse.json(
        { success: false, message: "marked must be true or false." },
        { status: 400 }
      );
    }

    const collection = dbConnect<BookingDocument>(BOOKINGS_COLLECTION_NAME);
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { marked } },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: marked ? "Booking marked." : "Booking unmarked.",
      booking: serializeBooking(result),
    });
  } catch (error) {
    console.error("Admin bookings PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update booking." },
      { status: 500 }
    );
  }
}
