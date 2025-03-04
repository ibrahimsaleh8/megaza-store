import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  try {
    cookies().delete("token");
    return NextResponse.json(
      { message: "Logeed out Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error " + error }, { status: 500 });
  }
}
