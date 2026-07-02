import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { naam, organisatie, email, bericht } = await request.json();

  if (!naam || !email || !email.includes("@") || !bericht) {
    return NextResponse.json(
      { error: "Vul alle verplichte velden in" },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: "Bloedband & Bedrijfsvoering <contact@bloedbandenbedrijfsvoering.nl>",
    to: "nick@quatrevingtquatre.nl",
    replyTo: email,
    subject: `Bericht van ${naam}${organisatie ? ` — ${organisatie}` : ""}`,
    text: `Naam: ${naam}\nOrganisatie: ${organisatie || "—"}\nE-mail: ${email}\n\n${bericht}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Versturen mislukt" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
