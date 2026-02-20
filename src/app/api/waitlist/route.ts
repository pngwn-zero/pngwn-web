import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/waitlist";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const SOURCE_MAX_LENGTH = 64;
const NOT_CONFIGURED_MESSAGE = "Waitlist backend not configured yet.";
const rateLimitStore = new Map<string, RateLimitEntry>();

function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseAdminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(clientIp);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(clientIp, existing);
  return false;
}

function parseSource(source: unknown): string {
  if (typeof source !== "string") {
    return "website";
  }

  const normalized = source.trim().toLowerCase();
  if (!normalized || normalized.length > SOURCE_MAX_LENGTH) {
    return "website";
  }

  return normalized;
}

function parseMetadata(request: NextRequest): Record<string, string> | null {
  const userAgent = request.headers.get("user-agent")?.slice(0, 255);
  const referrer = request.headers.get("referer")?.slice(0, 255);
  const metadata: Record<string, string> = {};

  if (userAgent) {
    metadata.user_agent = userAgent;
  }

  if (referrer) {
    metadata.referrer = referrer;
  }

  return Object.keys(metadata).length > 0 ? metadata : null;
}

function isDuplicateConstraint(error: { code?: string; message?: string }): boolean {
  if (error.code === "23505") {
    return true;
  }

  return error.message?.toLowerCase().includes("duplicate key value") ?? false;
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: { email?: unknown; source?: unknown };
  try {
    payload = (await request.json()) as { email?: unknown; source?: unknown };
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  if (typeof payload.email !== "string") {
    return NextResponse.json({ message: "Enter a valid email." }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Enter a valid email." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const source = parseSource(payload.source);
  const metadata = parseMetadata(request);

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("waitlist_signups").insert({
      email,
      source,
      metadata,
    });

    if (error) {
      if (isDuplicateConstraint(error)) {
        return NextResponse.json({ message: "You’re already on the list." }, { status: 409 });
      }

      return NextResponse.json(
        { message: "Unable to join waitlist right now. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "You’re in. Welcome to pngwn." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unable to join waitlist right now. Please try again." },
      { status: 500 },
    );
  }
}
