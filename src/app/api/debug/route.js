import { NextResponse } from "next/server";

// Dev-only debug endpoint to inspect in-memory cache
export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      note: "Use server logs to inspect cacheMap (dev)",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
