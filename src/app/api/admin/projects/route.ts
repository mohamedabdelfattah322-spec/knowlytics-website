import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "src/data/projects.json");

export async function GET() {
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
