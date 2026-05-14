/** 30-minute meeting slots only; business window for booking UI. */
export const MEETING_DURATION_MINUTES = 30;

/** How far ahead someone may book (excludes “open-ended” far future). */
export const MAX_BOOKING_ADVANCE_DAYS = 60;

/** Minimum lead time from “now” when booking the same calendar day (minutes). */
export const SAME_DAY_MIN_LEAD_MINUTES = 60;

/** First bookable slot (24h local). */
export const AVAILABILITY_START_HOUR = 10;

/**
 * Last moment of the working window (24h local). Meetings are 30m, so the
 * last start is 22:30 and ends at 23:00 (11 PM).
 */
export const AVAILABILITY_END_HOUR = 23;

function formatHour12(h: number, minute: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const m = minute === 0 ? "" : `:${String(minute).padStart(2, "0")}`;
  return `${h12}${m || ":00"} ${period}`;
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
