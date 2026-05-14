import type { Metadata } from "next";
import BookingMeetingClient from "@/components/booking/BookingMeetingClient";

export const metadata: Metadata = {
  title: "Book a meeting",
  description:
    "Schedule a 30-minute strategy call with Abu Rayhan. Fridays and invalid dates are not available.",
};

export default function BookingMeetingPage() {
  return <BookingMeetingClient />;
}
