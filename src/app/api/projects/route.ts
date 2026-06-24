import { NextResponse } from "next/server";
import { getMergedProjects } from "@/lib/projects/get-projects";

export async function GET() {
  try {
    const projects = await getMergedProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Public projects GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load projects.", projects: [] },
      { status: 500 }
    );
  }
}
