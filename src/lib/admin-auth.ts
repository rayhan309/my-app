import crypto from "crypto";
import { NextResponse } from "next/server";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL?.trim() &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SECRET?.trim()
  );
}

export function verifyAdminCredentials(
  email: string,
  password: string
): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) return false;

  const normalizedEmail = email.trim().toLowerCase();
  return (
    safeCompare(normalizedEmail, adminEmail) &&
    safeCompare(password, adminPassword)
  );
}

export function createAdminToken(): string | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return null;

  const expires = Date.now() + SESSION_MS;
  const payload = Buffer.from(JSON.stringify({ exp: expires })).toString(
    "base64url"
  );
  const sig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret || !token) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  try {
    if (!safeCompare(sig, expected)) return false;
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { message: "Unauthorized.", success: false },
    { status: 401 }
  );
}

export function requireAdmin(req: Request): NextResponse | null {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { message: "Admin is not configured.", success: false },
      { status: 503 }
    );
  }

  const token = getTokenFromRequest(req);
  if (!token || !verifyAdminToken(token)) {
    return unauthorizedResponse();
  }

  return null;
}
