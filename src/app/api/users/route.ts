import { NextResponse } from "next/server";
import { db } from "~/server/db"; 
import { user } from "~/server/db/auth-schema"; 

export async function GET() {
  try {
    const data = await db.select().from(user);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}