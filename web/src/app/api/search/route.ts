import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Echo API for now; returns empty to showcase empty state
  const _ = await req.json().catch(() => ({}));
  return NextResponse.json({ solutions: [] });
}



