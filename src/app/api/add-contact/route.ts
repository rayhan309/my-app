import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body, "body", req.headers);

        return NextResponse.json({ message: "Contact added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json({ message: "Failed to add contact", success: false }, { status: 500 });
    }
}