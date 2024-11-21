import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("auth-token", "", { maxAge: -1 }); // Remove cookie by setting a negative age
    return response;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return NextResponse.json({ error: "Unable to log out" }, { status: 500 });
  }
}
