import { NextResponse } from "next/server";

import { updateTestCaseStatus } from "@/lib/data-store";
import { type TestCaseStatus } from "@/lib/types";

interface Params {
  params: Promise<{ testCaseId: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  const { testCaseId } = await params;

  const body = (await request.json()) as { status?: TestCaseStatus };
  const status = body.status ?? "Untested";

  await updateTestCaseStatus(status, testCaseId);

  return NextResponse.json({ success: true, status });
}
