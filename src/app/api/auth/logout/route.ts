import { NextResponse } from "next/server";

export function GET() {
  try {
    return NextResponse.json(
      { message: "Logged out successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error " + error }, { status: 500 });
  }
}
