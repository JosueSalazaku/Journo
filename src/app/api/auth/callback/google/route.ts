import { NextResponse } from "next/server";
import { createClient } from "~/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";

  if (!code) {
    console.error("No OAuth code received");
    return NextResponse.redirect("/api/auth/auth-code-error");
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect("api/auth/auth-code-error");
    }

    return NextResponse.redirect(next);
  } catch (err) {
    console.error("Unexpected error during callback handling:", err);
    return NextResponse.redirect("api/auth/auth-code-error");
  }
}
