export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // TODO: Send to Laravel API
    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
