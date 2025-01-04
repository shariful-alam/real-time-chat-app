import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const messageData = await req.json();
  const response = await fetch("http://localhost:5000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
