import { NextResponse } from "next/server";

import { approvePlan } from "@/lib/data-store";

interface Params {
  params: Promise<{ planId: string }>;
}

export async function POST(_: Request, { params }: Params) {
  const { planId } = await params;
  const success = approvePlan(planId);

  if (!success) {
    return NextResponse.json({ error: "Plan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
