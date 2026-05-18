export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, companyName, email, phone, serviceType, description, budget, timeline } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        fullName,
        companyName: companyName || null,
        email,
        phone: phone || null,
        serviceType: serviceType || null,
        description: description || null,
        budget: budget || null,
        timeline: timeline || null,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
