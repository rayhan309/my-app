/** Safe for HTML email bodies */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type ContactMailFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
};

/** Public portfolio (live site) */
export const PORTFOLIO_URL = "https://my-portfolio-type.vercel.app/";

/** Company */
export const FLEXSHIP_URL = "https://flexshipit.com";

const brand = {
  primary: "#3b82f6",
  primaryDeep: "#1d4ed8",
  accent: "#9333ea",
  bg: "#020617",
  bgCard: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  muted: "#94a3b8",
  white: "#f8fafc",
};

/**
 * Inter everywhere (matches portfolio body font). Web font may be stripped in
 * some clients; stack falls back to system UI fonts.
 */
const EMAIL_FONT_STACK = `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

const FONT_BODY = `font-family:${EMAIL_FONT_STACK};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale`;

/**
 * Shell background inspired by site OverlayPattern:
 * slate grid (14×24px) + soft primary radial glow top-right.
 * Solid fallback color for clients that strip gradients.
 */
const SHELL_TD_STYLE = [
  "padding:40px 16px",
  FONT_BODY,
  `background-color:${brand.bg}`,
  "background-image:linear-gradient(to right,rgba(148,163,184,0.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(148,163,184,0.07) 1px,transparent 1px),radial-gradient(ellipse 100% 70% at 100% 0%,rgba(59,130,246,0.14),transparent 52%)",
  "background-size:14px 24px,14px 24px,100% 100%",
  "background-repeat:repeat,repeat,no-repeat",
].join(";");

function linkPill(href: string, label: string, subtitle: string): string {
  return `
<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="margin:0 0 10px 0;">
  <tr>
    <td style="border-radius:10px;border:1px solid ${brand.border};background-color:${brand.bgCard};padding:14px 18px;">
      <a href="${href}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;${FONT_BODY}">
        <span style="font-size:14px;font-weight:800;color:${brand.white};letter-spacing:-0.02em;">${label}</span>
        <span style="display:block;margin-top:4px;font-size:11px;font-weight:500;color:${brand.muted};word-break:break-all;">${subtitle}</span>
      </a>
    </td>
  </tr>
</table>`;
}

function layout(inner: string, preheader: string): string {
  const ph = escapeHtml(preheader);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Abu Rayhan</title>
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
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brand.primary};">Portfolio · Contact</span>
                  </td>
                </tr>
              </table>
              <span style="font-size:22px;font-weight:900;letter-spacing:-0.03em;color:${brand.white};">
                Abu <span style="color:${brand.primary};">Rayhan</span>
              </span>
              <div style="font-size:12px;color:${brand.muted};margin-top:8px;line-height:1.5;">
                Senior Full-stack Engineer ·
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
                      <span style="color:${brand.border};">—</span> Sent via portfolio contact form
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

/** Email to you when someone submits the form */
export function adminNotificationHtml(data: ContactMailFields): string {
  const n = escapeHtml(data.name);
  const e = escapeHtml(data.email);
  const p = escapeHtml(data.phone);
  const s = escapeHtml(data.subject);
  const d = escapeHtml(data.description).replace(/\n/g, "<br>");
  const tel = escapeHtml(telHref(data.phone));

  const inner = `
          <tr>
            <td style="background:${brand.card};border-radius:14px;padding:28px 26px;border:1px solid ${brand.border};box-shadow:0 18px 50px rgba(0,0,0,0.35);${FONT_BODY}">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:${brand.primary};">New inquiry</p>
                    <h1 style="margin:0 0 6px 0;font-size:21px;font-weight:900;color:${brand.white};line-height:1.25;letter-spacing:-0.02em;">${s}</h1>
                    <p style="margin:0 0 22px 0;font-size:12px;color:${brand.muted};">Reply directly to this email to reach <strong style="color:${brand.white};">${n}</strong>.</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" style="border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid ${brand.border};">
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};width:96px;border-bottom:1px solid ${brand.border};">Name</td><td style="padding:12px 14px;background:${brand.bgCard};border-bottom:1px solid ${brand.border};font-size:14px;color:${brand.white};font-weight:700;">${n}</td></tr>
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};border-bottom:1px solid ${brand.border};">Email</td><td style="padding:12px 14px;background:${brand.bgCard};border-bottom:1px solid ${brand.border};"><a href="mailto:${e}" style="color:${brand.primary};text-decoration:none;font-weight:700;">${e}</a></td></tr>
                <tr><td style="padding:12px 14px;background:${brand.bgCard};font-size:12px;color:${brand.muted};">Phone</td><td style="padding:12px 14px;background:${brand.bgCard};"><a href="${tel}" style="color:${brand.white};text-decoration:none;font-weight:600;">${p}</a></td></tr>
              </table>
              <p style="margin:18px 0 8px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:${brand.muted};">Message</p>
              <div style="margin:0;padding:18px;background:${brand.bg};border-radius:10px;border:1px solid ${brand.border};font-size:14px;color:${brand.white};line-height:1.7;">${d}</div>
            </td>
          </tr>`;

  return layout(inner, `New inquiry: ${data.subject} — ${data.name}`);
}

/** Confirmation to the visitor */
export function userConfirmationHtml(data: ContactMailFields): string {
  const n = escapeHtml(data.name);
  const s = escapeHtml(data.subject);

  const inner = `
          <tr>
            <td style="background:${brand.card};border-radius:14px;padding:32px 26px;border:1px solid ${brand.border};box-shadow:0 18px 50px rgba(0,0,0,0.35);text-align:left;${FONT_BODY}">
              <p style="margin:0 0 8px 0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:${brand.primary};">Confirmation</p>
              <h1 style="margin:0 0 14px 0;font-size:26px;font-weight:900;color:${brand.white};line-height:1.2;letter-spacing:-0.03em;">Thank you, ${n}</h1>
              <p style="margin:0 0 22px 0;font-size:15px;color:${brand.muted};line-height:1.7;">
                Your note about <strong style="color:${brand.white};">${s}</strong> is in my inbox. I typically respond within <strong style="color:${brand.white};">one to two business days</strong>.
              </p>
              <p style="margin:0 0 10px 0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${brand.muted};">While you wait</p>
              ${linkPill(
                PORTFOLIO_URL,
                "Explore the portfolio",
                "my-portfolio-type.vercel.app"
              )}
              ${linkPill(
                FLEXSHIP_URL,
                "FlexShip IT — digital studio",
                "flexshipit.com"
              )}
              <p style="margin:22px 0 0 0;font-size:12px;color:${brand.muted};line-height:1.65;border-top:1px solid ${brand.border};padding-top:18px;">
                If you did not submit this form, you can ignore this message.
              </p>
            </td>
          </tr>`;

  return layout(inner, `Thanks — I received your message about ${data.subject}`);
}

export function adminNotificationText(data: ContactMailFields): string {
  return [
    `New contact: ${data.subject}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Message:",
    data.description,
    "",
    "---",
    `Portfolio: ${PORTFOLIO_URL}`,
    `FlexShip IT: ${FLEXSHIP_URL}`,
  ].join("\n");
}

export function userConfirmationText(data: ContactMailFields): string {
  return [
    `Hi ${data.name},`,
    "",
    `Thank you for contacting me about "${data.subject}".`,
    "I've received your message and will reply within one to two business days.",
    "",
    "Explore my work:",
    PORTFOLIO_URL,
    "",
    "Company / studio:",
    FLEXSHIP_URL,
    "",
    "— Abu Rayhan",
    "Senior Full-stack Engineer, FlexShip IT",
  ].join("\n");
}
