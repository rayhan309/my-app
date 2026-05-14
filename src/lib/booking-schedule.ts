/** 30-minute meeting slots only; business window for booking UI. */
export const MEETING_DURATION_MINUTES = 30;

/** How far ahead someone may book (excludes “open-ended” far future). */
export const MAX_BOOKING_ADVANCE_DAYS = 10;

/** Minimum lead time from “now” when booking the same calendar day (minutes). */
export const SAME_DAY_MIN_LEAD_MINUTES = 60;

/** First bookable slot (24h local). */
export const AVAILABILITY_START_HOUR = 10;

/**
 * Last moment of the working window (24h local). Meetings are 30m, so the
 * last start is 22:30 and ends at 23:00 (11 PM).
 */
export const AVAILABILITY_END_HOUR = 23;

/** IANA zone for “today” when listing bookings (past calendar days excluded). Server: `BOOKING_TIMEZONE`; client: `NEXT_PUBLIC_BOOKING_TZ`. */
export const BOOKING_LIST_CALENDAR_TZ =
  (typeof process !== "undefined" &&
    (process.env.BOOKING_TIMEZONE?.trim() ||
      process.env.NEXT_PUBLIC_BOOKING_TZ?.trim())) ||
  "Asia/Dhaka";

/**
 * Calendar YYYY-MM-DD for “now” in the given IANA timezone (default booking list TZ).
 */
export function getTodayYmdInTimeZone(tz: string = BOOKING_LIST_CALENDAR_TZ): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatHour12(h: number, minute: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const m = minute === 0 ? "" : `:${String(minute).padStart(2, "0")}`;
  return `${h12}${m || ":00"} ${period}`;
}

/**
 * Converts a 24h slot like "12:30" into locale-friendly 12h text (e.g. "12:30 PM").
 * `value` stays "HH:mm"; use this only for display.
 */
export function formatSlotDisplay12h(
  hhmm: string,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return hhmm;
  const h = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);
  if (h > 23 || min > 59 || Number.isNaN(h) || Number.isNaN(min)) return hhmm;
  const d = new Date(2000, 0, 1, h, min, 0, 0);
  return d.toLocaleTimeString(locales, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  });
}

/** Add minutes to "HH:mm" → "HH:mm" (for slot end, etc.). */
export function addMinutesToSlotHHmm(hhmm: string, minutes: number): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return hhmm;
  const h = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);
  if (Number.isNaN(h) || Number.isNaN(min)) return hhmm;
  const d = new Date(2000, 0, 1, h, min + minutes, 0, 0);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/** e.g. "10:00 AM – 11:00 PM" for UI copy */
export function availabilityRangeLabel(): string {
  return `${formatHour12(AVAILABILITY_START_HOUR, 0)} – ${formatHour12(AVAILABILITY_END_HOUR, 0)}`;
}

export function parseLocalYMD(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map((x) => parseInt(x, 10));
  return new Date(y, m - 1, d);
}

export function formatLocalYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isFridayLocal(d: Date): boolean {
  return d.getDay() === 5;
}

export function bookingDateMessage(ymd: string, now: Date = new Date()): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return "Pick a valid date.";
  const picked = startOfLocalDay(parseLocalYMD(ymd));
  const today = startOfLocalDay(now);
  if (picked < today) return "Past dates cannot be booked.";
  const lastAllowed = new Date(today);
  lastAllowed.setDate(lastAllowed.getDate() + MAX_BOOKING_ADVANCE_DAYS);
  if (picked > lastAllowed) {
    return `Dates more than ${MAX_BOOKING_ADVANCE_DAYS} days ahead cannot be booked.`;
  }
  if (isFridayLocal(picked)) return "Meetings are not available on Fridays.";
  return null;
}

/** Start times for 30m blocks within [AVAILABILITY_START_HOUR, AVAILABILITY_END_HOUR). */
export function allHalfHourSlots(): string[] {
  const slots: string[] = [];
  const startMin = AVAILABILITY_START_HOUR * 60;
  const lastStartMin = AVAILABILITY_END_HOUR * 60 - MEETING_DURATION_MINUTES;
  for (let t = startMin; t <= lastStartMin; t += MEETING_DURATION_MINUTES) {
    const hh = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

export function slotsForSelectedDate(ymd: string, now: Date = new Date()): string[] {
  const all = allHalfHourSlots();
  const todayStr = formatLocalYMD(startOfLocalDay(now));
  if (ymd !== todayStr) return all;
  const cur = now.getHours() * 60 + now.getMinutes();
  const minStart = cur + SAME_DAY_MIN_LEAD_MINUTES;
  return all.filter((slot) => {
    const [hh, mm] = slot.split(":").map((x) => parseInt(x, 10));
    return hh * 60 + mm >= minStart;
  });
}
