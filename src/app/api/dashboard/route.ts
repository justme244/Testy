import { NextResponse } from "next/server";

import { getDashboardData, getPlanSummaryByStatus } from "@/lib/data-store";

export async function GET() {
  const data = await getDashboardData();

  return NextResponse.json({
    ...data,
    summary: {
      draft: await getPlanSummaryByStatus("Draft"),
      inReview: await getPlanSummaryByStatus("In Review"),
      approved: await getPlanSummaryByStatus("Approved"),
    },
  });
}
