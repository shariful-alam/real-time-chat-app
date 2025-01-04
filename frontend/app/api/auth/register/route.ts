import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
