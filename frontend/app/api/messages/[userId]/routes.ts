import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const response = await fetch(
    `http://localhost:5000/users/${params.userId}/messages`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
