import { NextResponse } from "next/server";
import {
  createAdminToken,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

function parseBody(body: unknown): { email: string; password: string } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const password = typeof o.password === "string" ? o.password : "";
  if (!email || !password) return null;
  return { email, password };
}

export async function POST(req: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        {
          message:
            "Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SECRET in .env.",
          success: false,
        },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body.", success: false },
        { status: 400 }
      );
    }

    const data = parseBody(body);
    if (!data) {
      return NextResponse.json(
        { message: "Email and password are required.", success: false },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(data.email, data.password)) {
      return NextResponse.json(
        { message: "Invalid email or password.", success: false },
        { status: 401 }
      );
    }

    const token = createAdminToken();
    if (!token) {
      return NextResponse.json(
        { message: "Could not create session.", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful.",
        success: true,
        token,
        adminEmail: process.env.ADMIN_EMAIL?.trim(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { message: "Login failed.", success: false },
      { status: 500 }
    );
  }
}
