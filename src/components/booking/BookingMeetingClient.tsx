"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

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

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
};

const STEPS = [
  {
    n: "01",
    title: "Scope, honestly",
    body: "What you are building, what is already decided, and where it is stuck.",
  },
  {
    n: "02",
    title: "Architecture, not theatre",
    body: "Stack, constraints, and a realistic path — including what I would not do.",
  },
  {
    n: "03",
    title: "A next step you can use",
    body: "Leave with a clear sequence. No pressure to retain anyone.",
  },
];

function prettyDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function fieldClass(invalid?: boolean) {
  return cn(
    "w-full rounded-sm border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70",
    invalid ? "border-red-500/80" : "border-border focus:border-primary"
  );
}

export default function BookingMeetingClient() {
  const queryClient = useQueryClient();
  const [now, setNow] = React.useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setNow(new Date());
  }, []);

  const hasHydrated = now !== null;
  const isFriday = now ? now.getDay() === 5 : false;

  const todayStr = useMemo(() => {
    if (!now) return "";
    return formatLocalYMD(startOfLocalDay(now));
  }, [now]);

  const maxDateStr = useMemo(() => {
    if (!now) return "";
    const t = startOfLocalDay(now);
    t.setDate(t.getDate() + MAX_BOOKING_ADVANCE_DAYS);
    return formatLocalYMD(t);
  }, [now]);

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

  const allSlotsForDate = useMemo(() => {
    if (!hasHydrated || !selectedDate || !now) return [];
    if (bookingDateMessage(selectedDate, now)) return [];
    return slotsForSelectedDate(selectedDate, now);
  }, [hasHydrated, now, selectedDate]);

  const selectableSlots = useMemo(
    () => allSlotsForDate.filter((slot) => !bookedTimesOnDate.has(slot)),
    [allSlotsForDate, bookedTimesOnDate]
  );

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
      await refreshBooking("bookings");
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setIsSuccess(true);
      reset();
    } catch (e) {
      console.error(e);
      setSubmitError(e instanceof Error ? e.message : "Failed to save booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pb-24 pt-8 md:pt-12">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          {!hasHydrated
            ? "Appointment"
            : isFriday
              ? "Studio closed · Friday"
              : "Booking open"}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:col-span-5"
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
            Appointment
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] md:text-5xl lg:text-[3.4rem]">
            Thirty quiet minutes.
            <span className="mt-2 block italic text-primary">No pitch required.</span>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-8 text-muted-foreground">
            A focused working conversation — goals, technical direction, or whether we should collaborate at all.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Length
              </dt>
              <dd className="font-display mt-1 text-2xl">{MEETING_DURATION_MINUTES} min</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Window
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {availabilityRangeLabel()}
                <span className="mt-0.5 block text-muted-foreground">Local time</span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Horizon
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Next {MAX_BOOKING_ADVANCE_DAYS} days
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Closed
              </dt>
              <dd className="mt-1 text-sm text-foreground">Fridays</dd>
            </div>
          </dl>

          <ol className="mt-12 space-y-6">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="font-display text-sm text-primary">{step.n}</span>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-border bg-card px-6 py-14 text-center md:px-12"
              >
                <CheckCircle2 className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
                <h2 className="font-display mt-6 text-3xl md:text-4xl">Held for you.</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                  The request is in. I will confirm by email shortly. Until then, the slot is reserved.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  Book another time
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-border bg-card"
              >
                <div className="flex items-baseline justify-between border-b border-border px-6 py-5 md:px-8">
                  <p className="font-display text-2xl">Reserve a slot</p>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Step sheet
                  </span>
                </div>

                <div className="space-y-8 px-6 py-8 md:px-8">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Please enter at least 2 characters",
                          },
                        })}
                        placeholder="How should I address you?"
                        className={fieldClass(Boolean(errors.name))}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="you@studio.com"
                        className={fieldClass(Boolean(errors.email))}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
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
                        className={fieldClass(Boolean(errors.phone))}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border pt-8">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div className="space-y-2">
                        <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                          Date
                        </label>
                        <input
                          type="date"
                          min={hasHydrated ? todayStr : undefined}
                          max={hasHydrated ? maxDateStr : undefined}
                          {...register("date", {
                            required: "Please choose a date",
                            validate: (v) =>
                              bookingDateMessage(v) === null ||
                              bookingDateMessage(v) ||
                              true,
                          })}
                          className={cn(fieldClass(Boolean(errors.date)), "max-w-xs")}
                        />
                        {errors.date && (
                          <p className="text-xs text-red-400">{errors.date.message}</p>
                        )}
                      </div>
                      {selectedDate && !bookingDateMessage(selectedDate) ? (
                        <p className="font-display text-xl text-primary">
                          {prettyDate(selectedDate)}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        Time · {MEETING_DURATION_MINUTES} min
                      </label>
                      {selectedDate && allSlotsForDate.length > 0 ? (
                        <span className="text-xs text-muted-foreground">
                          {selectableSlots.length} open
                        </span>
                      ) : null}
                    </div>
                    <input
                      type="hidden"
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
                              ? "Every slot on this day is taken — pick another day."
                              : selectedDate && allSlotsForDate.length === 0
                                ? "No slots left for this date — pick another day."
                                : "Pick a valid time slot",
                      })}
                    />

                    {!selectedDate ? (
                      <p className="border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                        Choose a date to see the day&apos;s grid.
                      </p>
                    ) : allSlotsForDate.length === 0 ? (
                      <p className="border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                        Nothing open on this date. Try another day.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {allSlotsForDate.map((t) => {
                          const booked = bookedTimesOnDate.has(t);
                          const active = selectedTime === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={booked}
                              onClick={() =>
                                setValue("time", t, { shouldValidate: true })
                              }
                              className={cn(
                                "rounded-sm border px-2 py-2.5 text-center text-xs transition-colors",
                                booked &&
                                  "cursor-not-allowed border-border/60 text-muted-foreground/50 line-through",
                                !booked &&
                                  !active &&
                                  "border-border text-foreground hover:border-primary hover:text-primary",
                                active &&
                                  "border-primary bg-primary text-primary-foreground"
                              )}
                            >
                              {formatSlotDisplay12h(t)}
                              {booked ? (
                                <span className="mt-0.5 block text-[10px] no-underline">
                                  Taken
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {errors.time && (
                      <p className="mt-2 text-xs text-red-400">{errors.time.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Agenda · optional
                    </label>
                    <textarea
                      rows={4}
                      {...register("notes", {
                        maxLength: {
                          value: 2000,
                          message: "Max 2000 characters",
                        },
                      })}
                      placeholder="What should we spend the half-hour on?"
                      className={cn(fieldClass(Boolean(errors.notes)), "resize-none")}
                    />
                    {errors.notes && (
                      <p className="text-xs text-red-400">{errors.notes.message}</p>
                    )}
                  </div>

                  {submitError ? (
                    <p className="text-sm text-red-400">{submitError}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={
                      !hasHydrated ||
                      isSubmitting ||
                      !selectedDate ||
                      selectableSlots.length === 0
                    }
                    className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Confirm reservation
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
