export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "Reviews";

export async function GET() {
  try {
    const filterFormula = encodeURIComponent(`{Status} = "Published"`);
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?filterByFormula=${filterFormula}&sort[0][field]=Date&sort[0][direction]=desc`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ records: [] });
    }

    const data = await res.json();

    const reviews = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.name || "",
      title: record.fields.title || "Knowlytics Hub Student",
      content: record.fields.Feedback || "",
      rating: record.fields.rating || 5,
      courseName: record.fields["Course Name"] || "",
      linkedin: record.fields.Linkedin || "",
      date: record.fields.Date || "",
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json({ reviews: [] });
  }
}
