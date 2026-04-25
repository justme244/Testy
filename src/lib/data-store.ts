import { randomUUID } from "node:crypto";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { bugs, comments, histories, projects, testCases, testPlans } from "@/db/schema";
import { type DashboardData, type PlanStatus, type Priority, type Severity, type TestCaseStatus } from "@/lib/types";

function parseSteps(raw: string) {
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return raw.split("\n").filter(Boolean);
  }
}

async function pushHistory(action: string) {
  await db.insert(histories).values({
    id: randomUUID(),
    action,
    timestamp: new Date().toISOString(),
  });
}

export async function getDashboardData(): Promise<DashboardData> {
  await ensureDashboardHasData();

  const [allPlans, allCases, allBugs, allComments, allHistories] = await Promise.all([
    db.select().from(testPlans),
    db.select().from(testCases),
    db.select().from(bugs).orderBy(desc(bugs.createdAt)),
    db.select().from(comments).orderBy(desc(comments.time)),
    db.select().from(histories).orderBy(desc(histories.timestamp)),
  ]);

  const focusedCase = allCases[0]!;

  return {
    projectName: "Aplikasi A · Sprint 12",
    activeRoles: ["Admin", "Editor", "Viewer"],
    plans: allPlans.map((plan) => ({
      id: plan.id,
      projectId: plan.projectId,
      title: plan.title,
      owner: plan.owner,
      status: plan.status,
      type: plan.type,
    })),
    testCase: {
      id: focusedCase.id,
      scenario: focusedCase.scenario,
      title: focusedCase.title,
      type: focusedCase.type,
      status: focusedCase.status,
      apiEndpoint: focusedCase.apiEndpoint ?? undefined,
      apiMethod: focusedCase.apiMethod ?? undefined,
      steps: parseSteps(focusedCase.steps),
      expectedResponse: focusedCase.expectedResponse ?? undefined,
      jiraTicket: focusedCase.jiraTicket ?? undefined,
    },
    bugs: allBugs.map((bug) => ({
      id: bug.id,
      testCaseId: bug.testCaseId,
      title: bug.title,
      severity: bug.severity,
      priority: bug.priority,
      steps: bug.steps,
      expectedResult: bug.expectedResult,
      actualResult: bug.actualResult,
      jiraTicket: bug.jiraTicket ?? undefined,
      createdAt: bug.createdAt,
    })),
    comments: allComments.map((comment) => ({
      id: comment.id,
      testCaseId: comment.testCaseId,
      user: comment.user,
      message: comment.message,
      time: comment.time,
    })),
    histories: allHistories.map((history) => ({
      id: history.id,
      action: history.action,
      timestamp: history.timestamp,
    })),
  };
}

export async function approvePlan(planId: string) {
  const [plan] = await db.select().from(testPlans).where(eq(testPlans.id, planId)).limit(1);
  if (!plan) return false;

  await db.update(testPlans).set({ status: "Approved" }).where(eq(testPlans.id, planId));
  await pushHistory(`Admin menyetujui test plan ${plan.title}`);
  return true;
}

export async function updateTestCaseStatus(status: TestCaseStatus, testCaseId = "tc-api-009") {
  await db.update(testCases).set({ status }).where(eq(testCases.id, testCaseId));
  await pushHistory(`Editor mengubah status test case menjadi ${status}`);
}

export async function createBug(input: {
  title: string;
  severity: Severity;
  priority: Priority;
  jiraTicket?: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
  testCaseId?: string;
}) {
  const targetCaseId = input.testCaseId ?? "tc-api-009";

  await db.insert(bugs).values({
    id: randomUUID(),
    testCaseId: targetCaseId,
    title: input.title,
    severity: input.severity,
    priority: input.priority,
    jiraTicket: input.jiraTicket,
    steps: input.steps,
    expectedResult: input.expectedResult,
    actualResult: input.actualResult,
    createdAt: new Date().toISOString(),
  });

  await pushHistory(`Bug baru dibuat: ${input.title} (${input.severity}/${input.priority})`);
}

export async function addComment(input: { user: string; message: string; testCaseId?: string }) {
  const targetCaseId = input.testCaseId ?? "tc-api-009";

  await db.insert(comments).values({
    id: randomUUID(),
    testCaseId: targetCaseId,
    user: input.user,
    message: input.message,
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  });

  await pushHistory(`${input.user} menambahkan komentar baru`);
}

export async function getPlanSummaryByStatus(status: PlanStatus) {
  const result = await db.select().from(testPlans).where(eq(testPlans.status, status));
  return result.length;
}

export async function ensureDashboardHasData() {
  const [existingProject] = await db.select().from(projects).limit(1);
  if (existingProject) return;

  await db.insert(projects).values({ id: "project-a", name: "Aplikasi A" });

  const [existingCase] = await db.select().from(testCases).where(and(eq(testCases.id, "tc-api-009"))).limit(1);
  if (!existingCase) {
    await db.insert(testCases).values({
      id: "tc-api-009",
      scenario: "Checkout payment",
      title: "TC-API-009 · Checkout with Valid Card",
      type: "API",
      status: "Untested",
      apiEndpoint: "/api/v1/checkout",
      apiMethod: "POST",
      steps: JSON.stringify(["Seed placeholder"]),
      expectedResponse: "{}",
      jiraTicket: null,
    });
  }
}
