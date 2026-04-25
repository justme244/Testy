import { NextResponse } from "next/server";

import { getDashboardData, getPlanSummaryByStatus } from "@/lib/data-store";

export async function GET() {
  const data = getDashboardData();

  return NextResponse.json({
    ...data,
    summary: {
      draft: getPlanSummaryByStatus("Draft"),
      inReview: getPlanSummaryByStatus("In Review"),
      approved: getPlanSummaryByStatus("Approved"),
    },
  });
}
