import type { Metadata } from "next";
import BookingMeetingClient from "@/components/booking/BookingMeetingClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Book a meeting",
  description:
    "Schedule a 30-minute strategy call with Abu Rayhan. Fridays and invalid dates are not available.",
};

export default async function BookingMeetingPage() {

  const queryClient =  new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["bookings"],
      queryFn: async () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_APP_URL?.trim();
        const res = await fetch(`${baseUrl}/api/get-booking`, {
          next: {
            revalidate: 30 * 60,
            tags: ["bookings"],
          },
        });
        const data = (await res.json()) as {
          bookings?: unknown[];
          success?: boolean;
        };
        if (!res.ok || !data?.success) return [];
        return Array.isArray(data.bookings) ? data.bookings : [];
      },
    });
  } catch {
    /* Prefetch is optional; client will refetch */
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <BookingMeetingClient />
    </HydrationBoundary>
  );
}
