import { NextResponse } from "next/server";
import { createLead } from "@/lib/baserow";

const SAUDI_MOBILE = /^(?:\+?966|0)5\d{8}$/;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;

  // Honeypot — real users never fill this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Submitted implausibly fast: almost certainly a bot.
  if (typeof body.elapsed === "number" && body.elapsed < 2000) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim().replace(/[\s-]/g, "");
  const email = String(body.email ?? "").trim();
  const caseType = String(body.caseType ?? "").trim();
  const details = String(body.details ?? "").trim();

  // Server-side validation mirrors the client's — never trust the browser.
  if (name.length < 2 || !SAUDI_MOBILE.test(phone) || details.length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  try {
    await createLead({ name, phone, email, caseType, details });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] Baserow submission failed:", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
