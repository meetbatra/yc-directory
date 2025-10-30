import { NextResponse } from "next/server";

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}
// A faulty API route to test Sentry's error monitoring
export function GET() {
  try {
    throw new SentryExampleAPIError("This error is raised on the backend called by the example page.");
  } catch (error) {
    // Only throw during runtime, not during build
    if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
      throw error;
    }
  }
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
