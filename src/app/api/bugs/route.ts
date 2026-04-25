import { NextResponse } from "next/server";

import { createBug } from "@/lib/data-store";
import { type Priority, type Severity } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    severity?: Severity;
    priority?: Priority;
    jiraTicket?: string;
    steps?: string;
    expectedResult?: string;
    actualResult?: string;
    testCaseId?: string;
  };

  await createBug({
    title: body.title ?? "Tanpa judul",
    severity: body.severity ?? "Low",
    priority: body.priority ?? "Low",
    jiraTicket: body.jiraTicket,
    steps: body.steps ?? "",
    expectedResult: body.expectedResult ?? "",
    actualResult: body.actualResult ?? "",
    testCaseId: body.testCaseId,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
