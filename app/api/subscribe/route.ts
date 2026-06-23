import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Ongeldig e-mailadres" },
      { status: 400 }
    );
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json();
    return NextResponse.json(
      { error: data.message || "Aanmelding mislukt" },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
