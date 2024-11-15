import { NextResponse } from "next/server";
import { createClient } from "~/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const origin = url.origin;

  if (!code) {
    console.error("No OAuth code received");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  try {
    const supabase = await createClient();

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Determine redirect URL
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";
    const redirectUrl = isLocalEnv
      ? `${origin}${next}`
      : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Unexpected error during callback handling:", err);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
