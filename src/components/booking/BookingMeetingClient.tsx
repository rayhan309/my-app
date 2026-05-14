"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarClock,
  Loader2,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  availabilityRangeLabel,
  bookingDateMessage,
  formatLocalYMD,
  formatSlotDisplay12h,
  MAX_BOOKING_ADVANCE_DAYS,
  MEETING_DURATION_MINUTES,
  slotsForSelectedDate,
  startOfLocalDay,
} from "@/lib/booking-schedule";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { refreshBooking } from "@/lib/refreshCache";

export type BookingRow = {
  _id: string;
  date: string;
  time: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  time12h?: string;
  meetingEnds12h?: string;
  durationMinutes?: number;
  appointmentAt?: string;
  createdAt?: string;
};

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
};

export default function BookingMeetingClient() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const isFriday = new Date().getDay() === 5;

  const todayStr = useMemo(
    () => formatLocalYMD(startOfLocalDay(new Date())),
    []
  );

  const maxDateStr = useMemo(() => {
    const t = startOfLocalDay(new Date());
    t.setDate(t.getDate() + MAX_BOOKING_ADVANCE_DAYS);
    return formatLocalYMD(t);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const { data: bookings = [] } = useQuery<BookingRow[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/get-booking");
      const data = (await res.json()) as {
        bookings?: BookingRow[];
        success?: boolean;
      };
      if (!res.ok || !data?.success) return [];
      return Array.isArray(data.bookings) ? data.bookings : [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  const bookedTimesOnDate = useMemo(() => {
    const set = new Set<string>();
    if (!selectedDate) return set;
    for (const b of bookings) {
      if (b?.date === selectedDate && typeof b.time === "string") {
        set.add(b.time);
      }
    }
    return set;
  }, [bookings, selectedDate]);

  /** Every slot offered for that day (includes booked — shown disabled). */
  const allSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    if (bookingDateMessage(selectedDate)) return [];
    return slotsForSelectedDate(selectedDate);
  }, [selectedDate]);

  /** Slots the user can actually book. */
  const selectableSlots = useMemo(
    () => allSlotsForDate.filter((slot) => !bookedTimesOnDate.has(slot)),
    [allSlotsForDate, bookedTimesOnDate]
  );

  const bookedCountOnDate = useMemo(() => {
    if (!selectedDate || allSlotsForDate.length === 0) return 0;
    return allSlotsForDate.filter((t) => bookedTimesOnDate.has(t)).length;
  }, [selectedDate, allSlotsForDate, bookedTimesOnDate]);

  React.useEffect(() => {
    if (!selectedDate || !selectedTime) return;
    if (!selectableSlots.includes(selectedTime)) {
      setValue("time", "");
    }
  }, [selectedDate, selectedTime, selectableSlots, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    const dateErr = bookingDateMessage(data.date);
    if (dateErr) return;
    if (!selectableSlots.includes(data.time)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/add-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          notes: data.notes ?? "",
          durationMinutes: MEETING_DURATION_MINUTES,
        }),
      });
      const json = (await res.json()) as {
        message?: string;
        success?: boolean;
      };
      if (!res.ok || !json?.success) {
        throw new Error(json.message || "Failed to save booking");
      }
      await refreshBooking('bookings');
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (e) {
      console.error(e);
      setSubmitError(
        e instanceof Error ? e.message : "Failed to save booking"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (isFriday) {
  //   return (
  //     <div className="relative min-h-[calc(100vh-5rem)] pb-20 pt-10">
  //       <div className="container mx-auto px-4">
  //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}">
  //           Friday is closed
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pb-20 pt-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6 ${isFriday
                  ? "bg-red-100/20 border-red-200/20 text-red-600" // শুক্রবারের জন্য লালচে কালার
                  : "bg-primary/10 border-primary/20 text-primary" // অন্য দিনের জন্য প্রাইমারি কালার
                }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFriday ? "bg-red-500" : "bg-primary"
                    }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${isFriday ? "bg-red-500" : "bg-primary"
                    }`}
                />
              </span>
              {isFriday ? "Friday is closed" : "Available now"}
            </div>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}
          >
            Book a {MEETING_DURATION_MINUTES}m{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              strategy call
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Reserve a focused session to review goals, technical direction, or
            collaboration fit. Each slot is {MEETING_DURATION_MINUTES} minutes.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
            Slots run {availabilityRangeLabel()} (local time), every{" "}
            {MEETING_DURATION_MINUTES} minutes; the last meeting of the day
            ends at 11:00 PM. Fridays are closed. Past dates and dates more than{" "}
            {MAX_BOOKING_ADVANCE_DAYS} days ahead cannot be booked.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-md border border-border/40 bg-card/40 backdrop-blur-sm p-6 shadow-xl">
              <div className="flex items-center gap-3 text-primary mb-3">
                <CalendarClock className="w-6 h-6" />
                <span className="font-bold">What to expect</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>Quick alignment on scope, stack, and timelines.</li>
                <li>Honest feedback on feasibility and next steps.</li>
                <li>No pressure — just a structured working conversation.</li>
              </ul>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-card/40 border border-border/10 p-6 md:p-10 rounded-md backdrop-blur-sm shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Full name
                    </label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Please enter at least 2 characters",
                        },
                      })}
                      placeholder="Your name"
                      className={`w-full bg-background/50 border ${errors.name ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="you@example.com"
                      className={`w-full bg-background/50 border ${errors.email ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Phone
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        minLength: {
                          value: 8,
                          message: "Enter a valid phone number",
                        },
                      })}
                      placeholder="+880 …"
                      className={`w-full bg-background/50 border ${errors.phone ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Date
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      max={maxDateStr}
                      {...register("date", {
                        required: "Please choose a date",
                        validate: (v) =>
                          bookingDateMessage(v) === null ||
                          bookingDateMessage(v) ||
                          true,
                      })}
                      className={`w-full bg-background/50 border ${errors.date ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.date && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Time ({MEETING_DURATION_MINUTES} min)
                    </label>
                    <select
                      {...register("time", {
                        required: "Please choose a time",
                        validate: (v) =>
                          selectedDate &&
                            selectableSlots.length > 0 &&
                            selectableSlots.includes(v)
                            ? true
                            : selectedDate &&
                              allSlotsForDate.length > 0 &&
                              selectableSlots.length === 0
                              ? "Every slot on this day already has an appointment — pick another day."
                              : selectedDate && allSlotsForDate.length === 0
                                ? "No slots left for this date — pick another day."
                                : "Pick a valid time slot",
                      })}
                      disabled={!selectedDate || allSlotsForDate.length === 0}
                      className={`w-full bg-background/50 border ${errors.time ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors disabled:opacity-50 [&_option:disabled]:cursor-not-allowed [&_option:disabled]:text-muted-foreground`}
                    >
                      <option value="">
                        {!selectedDate
                          ? "Pick a date first"
                          : allSlotsForDate.length === 0
                            ? "No times available"
                            : selectableSlots.length === 0
                              ? "All slots booked — pick another day"
                              : "Select a time"}
                      </option>
                      {allSlotsForDate.map((t) => {
                        const booked = bookedTimesOnDate.has(t);
                        return (
                          <option key={t} value={t} disabled={booked}>
                            {formatSlotDisplay12h(t)}
                            {booked ? " — Have an appointment" : ""}
                          </option>
                        );
                      })}
                    </select>
                    {bookedCountOnDate > 0 && selectedDate && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground/80">
                          appointment
                        </span>{" "}
                        are written in the slot book — disabled in the list. Select free slots.
                      </p>
                    )}
                    {errors.time && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.time.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">
                      Agenda (optional)
                    </label>
                    <textarea
                      rows={4}
                      {...register("notes", {
                        maxLength: {
                          value: 2000,
                          message: "Max 2000 characters",
                        },
                      })}
                      placeholder="What would you like to cover?"
                      className={`w-full bg-background/50 border ${errors.notes ? "border-red-500" : "border-border/50"
                        } px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors resize-none`}
                    />
                    {errors.notes && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.notes.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !selectedDate ||
                    selectableSlots.length === 0
                  }
                  className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Reserve slot
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </>
                  )}
                </button>

                {submitError && (
                  <p className="text-center text-sm text-red-500 font-medium">
                    {submitError}
                  </p>
                )}

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-sm text-green-500 font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Request received — I&apos;ll confirm by email shortly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
