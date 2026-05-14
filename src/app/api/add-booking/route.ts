import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body, "body", req.headers);

        return NextResponse.json({ message: "Booking added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error in booking API:", error);
        return NextResponse.json({ message: "Failed to add booking", success: false }, { status: 500 });
    }
}