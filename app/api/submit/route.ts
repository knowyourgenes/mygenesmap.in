import { NextResponse } from "next/server";
import { getWriteClient } from "../../../sanity/write-client";

// Receives a composer submission (Ask a question / Add your answer) and stores
// it in Sanity as a `submission` doc with status "new" — a moderation queue.
// Nothing reaches the live feed without an editor publishing it. Uses the
// server-only write client, so no token is ever exposed to the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TEXT = 4000;
const MAX_NAME = 120;

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const kind = body.kind === "answer" ? "answer" : "question";
  const text = clean(body.text, MAX_TEXT);
  if (text.length < 5) {
    return NextResponse.json(
      { error: "Please write a bit more." },
      { status: 422 },
    );
  }

  const client = getWriteClient();
  if (!client) {
    return NextResponse.json(
      { error: "submissions are not configured" },
      { status: 503 },
    );
  }

  try {
    await client.create({
      _type: "submission",
      kind,
      text,
      authorName: clean(body.authorName, MAX_NAME) || undefined,
      authorCredential: clean(body.authorCredential, MAX_NAME) || undefined,
      email: clean(body.email, MAX_NAME) || undefined,
      questionSlug: clean(body.questionSlug, 200) || undefined,
      questionTitle: clean(body.questionTitle, 300) || undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/submit]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
