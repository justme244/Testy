import { NextResponse } from "next/server";

import { addComment } from "@/lib/data-store";

export async function POST(request: Request) {
  const body = (await request.json()) as { user?: string; message?: string };

  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "Komentar tidak boleh kosong" }, { status: 400 });
  }

  addComment({ user: body.user ?? "@qa-user", message });

  return NextResponse.json({ success: true }, { status: 201 });
}
