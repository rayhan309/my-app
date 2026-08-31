import {
  escapeHtml,
  FLEXSHIP_URL,
  PORTFOLIO_URL,
} from "@/lib/mail/contact-templates";
import {
  addMinutesToSlotHHmm,
  BOOKING_LIST_CALENDAR_TZ,
} from "@/lib/booking-schedule";

export type BookingMailPayload = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  time12h: string;
  meetingEnds12h: string;
  durationMinutes: number;
  notes: string;
  appointmentAtIso?: string;
};

const brand = {
  gold: "#e4c9a0",
  ink: "#ece7dc",
  bg: "#0b0a09",
  paper: "#141311",
  rule: "#2a2722",
  muted: "#9a9386",
  dark: "#1a1612",
};

const SERIF = `Georgia,'Times New Roman',Times,serif`;
const SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI',Outfit,Roboto,sans-serif`;
const FONT = `font-family:${SANS};-webkit-font-smoothing:antialiased`;
const FONT_SERIF = `font-family:${SERIF}`;

function compactDate(ymd: string): string {
  return ymd.replace(/-/g, "");
}

function compactTime(hhmm: string): string {
  return hhmm.replace(":", "");
}

export function formatBookingDateLong(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return ymd;
  const dt = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function googleCalendarUrl(data: BookingMailPayload): string {
  const start = `${compactDate(data.date)}T${compactTime(data.time)}00`;
  const endHhmm = addMinutesToSlotHHmm(data.time, data.durationMinutes);
  const end = `${compactDate(data.date)}T${compactTime(endHhmm)}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Strategy call with Abu Rayhan",
    dates: `${start}/${end}`,
    ctz: BOOKING_LIST_CALENDAR_TZ,
    details:
      "Thirty-minute working conversation. Meeting link will be confirmed by email.",
    location: "Video call — details by email",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function icsUtcStamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
}

export function buildBookingIcs(data: BookingMailPayload): string {
  const uid = `${compactDate(data.date)}-${compactTime(data.time)}@aburayhan`;
  const start = `${compactDate(data.date)}T${compactTime(data.time)}00`;
  const endHhmm = addMinutesToSlotHHmm(data.time, data.durationMinutes);
  const end = `${compactDate(data.date)}T${compactTime(endHhmm)}00`;
  const desc = icsEscape(
    `Strategy call with Abu Rayhan (${data.durationMinutes} min).\n${data.notes || "Agenda to be discussed."}`
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abu Rayhan//Strategy Call//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsUtcStamp(new Date())}`,
    `DTSTART;TZID=${BOOKING_LIST_CALENDAR_TZ}:${start}`,
    `DTEND;TZID=${BOOKING_LIST_CALENDAR_TZ}:${end}`,
    "SUMMARY:Strategy call with Abu Rayhan",
    `DESCRIPTION:${desc}`,
    "LOCATION:Video call — confirmed by email",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function letterShell(inner: string, preheader: string): string {
  const ph = escapeHtml(preheader);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reservation · Abu Rayhan</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:${brand.bg};${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${brand.bg};opacity:0;">${ph}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${brand.bg};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:540px;border-collapse:collapse;">
          <tr>
            <td style="height:3px;background-color:${brand.gold};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color:${brand.paper};padding:36px 32px 28px 32px;border:1px solid ${brand.rule};border-top:none;">
              <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:${brand.gold};${FONT};">Abu Rayhan</p>
              <p style="margin:0 0 28px 0;font-size:11px;letter-spacing:0.08em;color:${brand.muted};${FONT};">Senior Full-stack Engineer · FlexShip IT</p>
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 8px 0 8px;text-align:center;">
              <p style="margin:0 0 10px 0;">
                <a href="${PORTFOLIO_URL}" style="color:${brand.gold};font-size:12px;text-decoration:none;letter-spacing:0.04em;${FONT};">Portfolio</a>
                <span style="color:${brand.rule};padding:0 10px;">·</span>
                <a href="${FLEXSHIP_URL}" style="color:${brand.muted};font-size:12px;text-decoration:none;${FONT};">FlexShip IT</a>
              </p>
              <p style="margin:0;font-size:11px;line-height:1.7;color:${brand.muted};${FONT};">
                Dhaka · ${escapeHtml(BOOKING_LIST_CALENDAR_TZ)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ticketRow(label: string, value: string): string {
  return `<td style="width:33.33%;padding:14px 10px;vertical-align:top;border-right:1px solid ${brand.rule};">
    <p style="margin:0 0 6px 0;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.muted};${FONT};">${label}</p>
    <p style="margin:0;font-size:15px;line-height:1.35;color:${brand.ink};${FONT_SERIF};">${value}</p>
  </td>`;
}

export function bookingUserHtml(data: BookingMailPayload): string {
  const n = escapeHtml(data.name);
  const dateLong = escapeHtml(formatBookingDateLong(data.date));
  const t12 = escapeHtml(data.time12h);
  const end12 = escapeHtml(data.meetingEnds12h);
  const dur = escapeHtml(String(data.durationMinutes));
  const cal = escapeHtml(googleCalendarUrl(data));
  const notes = data.notes.trim()
    ? escapeHtml(data.notes).replace(/\n/g, "<br>")
    : "";

  const inner = `
    <p style="margin:0;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:${brand.gold};${FONT};">Reservation</p>
    <h1 style="margin:10px 0 8px 0;font-size:32px;line-height:1.15;font-weight:400;color:${brand.ink};${FONT_SERIF};">
      Held for you, ${n}.
    </h1>
    <p style="margin:0 0 28px 0;font-size:18px;font-style:italic;color:${brand.gold};${FONT_SERIF};">
      Thirty quiet minutes. No pitch required.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${brand.rule};border-left:3px solid ${brand.gold};margin:0 0 24px 0;">
      <tr>
        ${ticketRow("Day", dateLong)}
        ${ticketRow("Window", `${t12}<br><span style="font-size:12px;color:${brand.muted};font-family:${SANS};">to ${end12}</span>`)}
        <td style="width:33.33%;padding:14px 10px;vertical-align:top;">
          <p style="margin:0 0 6px 0;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.muted};${FONT};">Length</p>
          <p style="margin:0;font-size:15px;color:${brand.ink};${FONT_SERIF};">${dur} minutes</p>
        </td>
      </tr>
    </table>
    ${
      notes
        ? `<p style="margin:0 0 8px 0;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.muted};${FONT};">Your agenda</p>
           <p style="margin:0 0 24px 0;padding:14px 16px;border:1px solid ${brand.rule};background:${brand.bg};font-size:14px;line-height:1.7;color:${brand.ink};${FONT};">${notes}</p>`
        : ""
    }
    <p style="margin:0 0 22px 0;font-size:14px;line-height:1.75;color:${brand.muted};${FONT};">
      This slot is reserved. I will write back with the video link. Until then, add it to your calendar so it does not get lost in the week.
    </p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px 0;">
      <tr>
        <td style="background-color:${brand.gold};">
          <a href="${cal}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 22px;color:${brand.dark};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;font-weight:600;${FONT};">Add to Google Calendar</a>
        </td>
      </tr>
    </table>
    <p style="margin:0;padding-top:22px;border-top:1px solid ${brand.rule};font-size:13px;line-height:1.7;color:${brand.ink};${FONT_SERIF};">
      — Abu<br>
      <span style="font-size:12px;font-style:normal;color:${brand.muted};font-family:${SANS};">Reply to this email if you need to move the time.</span>
    </p>
  `;

  return letterShell(inner, `Held for you — ${formatBookingDateLong(data.date)} at ${data.time12h}`);
}

export function bookingAdminHtml(data: BookingMailPayload): string {
  const n = escapeHtml(data.name);
  const e = escapeHtml(data.email);
  const p = escapeHtml(data.phone);
  const dateLong = escapeHtml(formatBookingDateLong(data.date));
  const t12 = escapeHtml(data.time12h);
  const end12 = escapeHtml(data.meetingEnds12h);
  const notes = escapeHtml(data.notes || "—").replace(/\n/g, "<br>");
  const dur = escapeHtml(String(data.durationMinutes));

  const inner = `
    <p style="margin:0;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:${brand.gold};${FONT};">New reservation</p>
    <h1 style="margin:10px 0 22px 0;font-size:28px;line-height:1.2;font-weight:400;color:${brand.ink};${FONT_SERIF};">${n}</h1>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${brand.rule};border-left:3px solid ${brand.gold};margin:0 0 20px 0;">
      <tr>
        ${ticketRow("Day", dateLong)}
        ${ticketRow("Window", `${t12}<br><span style="font-size:12px;color:${brand.muted};font-family:${SANS};">to ${end12}</span>`)}
        <td style="width:33.33%;padding:14px 10px;vertical-align:top;">
          <p style="margin:0 0 6px 0;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.muted};${FONT};">Length</p>
          <p style="margin:0;font-size:15px;color:${brand.ink};${FONT_SERIF};">${dur} min</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 6px 0;font-size:12px;${FONT};"><a href="mailto:${e}" style="color:${brand.gold};text-decoration:none;">${e}</a></p>
    <p style="margin:0 0 20px 0;font-size:12px;color:${brand.muted};${FONT};">${p}</p>
    <p style="margin:0 0 8px 0;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${brand.muted};${FONT};">Agenda</p>
    <p style="margin:0;padding:14px 16px;border:1px solid ${brand.rule};background:${brand.bg};font-size:14px;line-height:1.7;color:${brand.ink};${FONT};">${notes}</p>
  `;

  return letterShell(inner, `New booking: ${data.name} — ${data.date} ${data.time12h}`);
}

export function bookingAdminText(data: BookingMailPayload): string {
  return [
    "New meeting reservation",
    "",
    `Guest: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    `${formatBookingDateLong(data.date)}`,
    `${data.time12h} – ${data.meetingEnds12h} (${data.durationMinutes} min)`,
    "",
    "Agenda:",
    data.notes || "—",
    "",
    PORTFOLIO_URL,
  ].join("\n");
}

export function bookingUserText(data: BookingMailPayload): string {
  return [
    `Held for you, ${data.name}.`,
    "",
    `${formatBookingDateLong(data.date)}`,
    `${data.time12h} – ${data.meetingEnds12h} (${data.durationMinutes} minutes)`,
    "",
    data.notes ? `Agenda:\n${data.notes}\n` : "",
    "This slot is reserved. I will confirm the video link by email.",
    "",
    `Add to Google Calendar:\n${googleCalendarUrl(data)}`,
    "",
    "— Abu Rayhan",
    PORTFOLIO_URL,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function parseBookingMailBody(body: unknown): BookingMailPayload | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim().toLowerCase() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const date = typeof o.date === "string" ? o.date.trim() : "";
  const time = typeof o.time === "string" ? o.time.trim() : "";
  const time12h = typeof o.time12h === "string" ? o.time12h.trim() : "";
  const meetingEnds12h =
    typeof o.meetingEnds12h === "string" ? o.meetingEnds12h.trim() : "";
  const notes = typeof o.notes === "string" ? o.notes.trim() : "";
  const appointmentAtIso =
    typeof o.appointmentAtIso === "string" ? o.appointmentAtIso.trim() : undefined;

  const dm = o.durationMinutes;
  const durationMinutes =
    typeof dm === "number" && Number.isFinite(dm)
      ? dm
      : typeof dm === "string"
        ? parseInt(dm, 10)
        : NaN;

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length < 8 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time) ||
    time12h.length < 3 ||
    meetingEnds12h.length < 3 ||
    !Number.isFinite(durationMinutes) ||
    durationMinutes < 1 ||
    notes.length > 2000
  ) {
    return null;
  }

  return {
    name,
    email,
    phone,
    date,
    time,
    time12h,
    meetingEnds12h,
    durationMinutes,
    notes,
    appointmentAtIso,
  };
}
