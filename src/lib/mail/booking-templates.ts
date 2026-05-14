import {
  escapeHtml,
  FLEXSHIP_URL,
  PORTFOLIO_URL,
} from "@/lib/mail/contact-templates";

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
  /** ISO string for calendar context in copy */
  appointmentAtIso?: string;
};

const brand = {
  primary: "#3b82f6",
  primaryDeep: "#1d4ed8",
  bg: "#020617",
  bgCard: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  muted: "#94a3b8",
  white: "#f8fafc",
};

const EMAIL_FONT_STACK = `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;
const FONT_BODY = `font-family:${EMAIL_FONT_STACK};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale`;

const SHELL_TD_STYLE = [
  "padding:40px 16px",
  FONT_BODY,
  `background-color:${brand.bg}`,
  "background-image:linear-gradient(to right,rgba(148,163,184,0.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(148,163,184,0.07) 1px,transparent 1px),radial-gradient(ellipse 100% 70% at 100% 0%,rgba(59,130,246,0.14),transparent 52%)",
  "background-size:14px 24px,14px 24px,100% 100%",
  "background-repeat:repeat,repeat,no-repeat",
].join(";");

function formatBookingDateLong(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return ymd;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10) - 1;
  const d = parseInt(m[3], 10);
  const dt = new Date(y, mo, d);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function bookingLayout(inner: string, preheader: string): string {
  const ph = escapeHtml(preheader);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Meeting booking · Abu Rayhan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:${brand.bg};${FONT_BODY};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${brand.bg};opacity:0;">
    ${ph}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${brand.bg};">
    <tr>
      <td align="center" style="${SHELL_TD_STYLE}">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;border-collapse:collapse;${FONT_BODY};">
          <tr>
            <td style="padding:0 0 8px 0;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto 14px auto;">
                <tr>
                  <td style="border-radius:999px;background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25);padding:6px 14px;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brand.primary};">Meeting · Booking</span>
                  </td>
                </tr>
              </table>
              <span style="font-size:22px;font-weight:900;letter-spacing:-0.03em;color:${brand.white};">
                Abu <span style="color:${brand.primary};">Rayhan</span>
              </span>
              <div style="font-size:12px;color:${brand.muted};margin-top:8px;line-height:1.5;">
                30-minute strategy call ·
                <a href="${FLEXSHIP_URL}" target="_blank" rel="noopener noreferrer" style="color:${brand.primary};text-decoration:none;font-weight:600;">FlexShip IT</a>
              </div>
            </td>
          </tr>
          ${inner}
          <tr>
            <td style="padding:32px 0 0 0;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-top:1px solid ${brand.border};padding-top:24px;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0 0 14px 0;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${brand.muted};">Links</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 6px 8px 6px;">
                          <a href="${PORTFOLIO_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 16px;border-radius:8px;background:linear-gradient(135deg,${brand.primary},${brand.primaryDeep});color:#ffffff;font-size:12px;font-weight:800;text-decoration:none;${FONT_BODY};">View portfolio</a>
                        </td>
                        <td style="padding:0 6px 8px 6px;">
                          <a href="${FLEXSHIP_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 16px;border-radius:8px;border:1px solid ${brand.border};background-color:${brand.bgCard};color:${brand.white};font-size:12px;font-weight:700;text-decoration:none;${FONT_BODY};">FlexShip IT</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:16px 0 0 0;font-size:11px;color:${brand.muted};line-height:1.65;">
                      Dhaka, Bangladesh · Available worldwide<br>
                      <span style="color:${brand.border};">—</span> Sent via portfolio meeting booking
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits || phone}`;
}

export function bookingAdminHtml(data: BookingMailPayload): string {
  const n = escapeHtml(data.name);
  const e = escapeHtml(data.email);
  const p = escapeHtml(data.phone);
  const dateLong = escapeHtml(formatBookingDateLong(data.date));
  const dateRaw = escapeHtml(data.date);
  const t24 = escapeHtml(data.time);
  const t12 = escapeHtml(data.time12h);
  const end12 = escapeHtml(data.meetingEnds12h);
  const notes = escapeHtml(data.notes || "").replace(/\n/g, "<br>") || "—";
  const tel = escapeHtml(telHref(data.phone));
  const dur = escapeHtml(String(data.durationMinutes));

  const inner = `
          <tr>
            <td style="background:${brand.card};border-radius:14px;padding:28px 26px;border:1px solid ${brand.border};box-shadow:0 18px 50px rgba(0,0,0,0.35);${FONT_BODY}">
              <p style="margin:0 0 6px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:${brand.primary};">New booking</p>
              <h1 style="margin:0 0 10px 0;font-size:22px;font-weight:900;color:${brand.white};line-height:1.25;letter-spacing:-0.02em;">${dateLong}</h1>
              <p style="margin:0 0 20px 0;font-size:13px;color:${brand.muted};line-height:1.6;">
                <strong style="color:${brand.white};">${t12}</strong> – <strong style="color:${brand.white};">${end12}</strong>
                <span style="color:${brand.muted};"> (${dur} min)</span><br>
                <span style="font-size:12px;">Calendar date: ${dateRaw} · Start ${t24} (24h)</span>
              </p>
              <table role="presentation" width="100%" style="border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid ${brand.border};">
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};width:100px;border-bottom:1px solid ${brand.border};">Guest</td><td style="padding:12px 14px;background:${brand.bgCard};border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.white};font-weight:700;">${n}</td></tr>
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};border-bottom:1px solid ${brand.border};">Email</td><td style="padding:12px 14px;background:${brand.bgCard};border-bottom:1px solid ${brand.border};"><a href="mailto:${e}" style="color:${brand.primary};text-decoration:none;font-weight:700;">${e}</a></td></tr>
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};">Phone</td><td style="padding:12px 14px;background:${brand.bgCard};"><a href="${tel}" style="color:${brand.white};text-decoration:none;font-weight:600;">${p}</a></td></tr>
              </table>
              <p style="margin:18px 0 8px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:${brand.muted};">Agenda</p>
              <div style="margin:0;padding:18px;background:${brand.bg};border-radius:10px;border:1px solid ${brand.border};font-size:14px;color:${brand.white};line-height:1.7;">${notes}</div>
              <p style="margin:18px 0 0 0;font-size:12px;color:${brand.muted};">Reply to the guest via their email above to confirm or adjust.</p>
            </td>
          </tr>`;

  return bookingLayout(inner, `New booking: ${data.date} ${data.time12h} — ${data.name}`);
}

export function bookingUserHtml(data: BookingMailPayload): string {
  const n = escapeHtml(data.name);
  const dateLong = escapeHtml(formatBookingDateLong(data.date));
  const t12 = escapeHtml(data.time12h);
  const end12 = escapeHtml(data.meetingEnds12h);
  const dur = escapeHtml(String(data.durationMinutes));

  const inner = `
          <tr>
            <td style="background:${brand.card};border-radius:14px;padding:32px 26px;border:1px solid ${brand.border};box-shadow:0 18px 50px rgba(0,0,0,0.35);text-align:left;${FONT_BODY}">
              <p style="margin:0 0 8px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:${brand.primary};">Booking received</p>
              <h1 style="margin:0 0 14px 0;font-size:26px;font-weight:900;color:${brand.white};line-height:1.2;letter-spacing:-0.03em;">You&apos;re on the calendar, ${n}</h1>
              <p style="margin:0 0 18px 0;font-size:15px;color:${brand.muted};line-height:1.7;">
                Thanks for booking a <strong style="color:${brand.white};">${dur}-minute</strong> strategy call. Here&apos;s a summary of your slot:
              </p>
              <div style="padding:20px 18px;border-radius:12px;border:1px solid ${brand.border};background:${brand.bg};margin:0 0 22px 0;">
                <p style="margin:0 0 6px 0;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">When</p>
                <p style="margin:0;font-size:18px;font-weight:800;color:${brand.white};letter-spacing:-0.02em;">${dateLong}</p>
                <p style="margin:10px 0 0 0;font-size:15px;color:${brand.primary};font-weight:700;">${t12} – ${end12}</p>
              </div>
              <p style="margin:0 0 18px 0;font-size:13px;color:${brand.muted};line-height:1.65;">
                I&apos;ll follow up by email to confirm the link (Google Meet / Zoom) or any prep material. If you need to reschedule, just reply to this thread.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="border-radius:10px;border:1px solid ${brand.border};background:${brand.bgCard};padding:14px 16px;">
                    <a href="${PORTFOLIO_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;${FONT_BODY}">
                      <span style="font-size:13px;font-weight:800;color:${brand.white};">Portfolio</span>
                      <span style="display:block;margin-top:4px;font-size:11px;color:${brand.muted};">my-portfolio-type.vercel.app</span>
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0 0;font-size:12px;color:${brand.muted};line-height:1.65;border-top:1px solid ${brand.border};padding-top:18px;">
                If you didn&apos;t request this booking, reply and we&apos;ll sort it out.
              </p>
            </td>
          </tr>`;

  return bookingLayout(inner, `Booking confirmed — ${data.date} at ${data.time12h}`);
}

export function bookingAdminText(data: BookingMailPayload): string {
  return [
    "New meeting booking",
    "",
    `Date: ${formatBookingDateLong(data.date)} (${data.date})`,
    `Time: ${data.time12h} – ${data.meetingEnds12h} (${data.time} 24h)`,
    `Duration: ${data.durationMinutes} min`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Agenda / notes:",
    data.notes || "—",
    "",
    "---",
    PORTFOLIO_URL,
    FLEXSHIP_URL,
  ].join("\n");
}

export function bookingUserText(data: BookingMailPayload): string {
  return [
    `Hi ${data.name},`,
    "",
    "Your meeting booking is received.",
    "",
    `${formatBookingDateLong(data.date)}`,
    `${data.time12h} – ${data.meetingEnds12h} (${data.durationMinutes} min)`,
    "",
    "I will confirm the call link or next steps by email shortly.",
    "",
    "Portfolio:",
    PORTFOLIO_URL,
    "",
    "— Abu Rayhan",
  ].join("\n");
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
