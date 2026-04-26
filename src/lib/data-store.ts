import { randomUUID } from "node:crypto";

import {
  BugModel,
  CommentModel,
  HistoryModel,
  ProjectModel,
  TestCaseModel,
  TestPlanModel,
} from "@/db/models";
import { connectMongo } from "@/lib/mongodb";
import { type DashboardData, type PlanStatus, type Priority, type Severity, type TestCaseStatus } from "@/lib/types";

async function pushHistory(action: string) {
  await HistoryModel.create({
    id: randomUUID(),
    action,
    timestamp: new Date().toISOString(),
  });
}

export async function getDashboardData(): Promise<DashboardData> {
  await connectMongo();
  await ensureDashboardHasData();

  const [allPlans, allCases, allBugs, allComments, allHistories] = await Promise.all([
    TestPlanModel.find().lean(),
    TestCaseModel.find().lean(),
    BugModel.find().sort({ createdAt: -1 }).lean(),
    CommentModel.find().sort({ createdAt: -1 }).lean(),
    HistoryModel.find().sort({ createdAt: -1 }).lean(),
  ]);

  const focusedCase = allCases[0];
  if (!focusedCase) {
    throw new Error("No test case found. Please run seed script.");
  }

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
      apiEndpoint: focusedCase.apiEndpoint,
      apiMethod: focusedCase.apiMethod,
      steps: focusedCase.steps,
      expectedResponse: focusedCase.expectedResponse,
      jiraTicket: focusedCase.jiraTicket,
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
      jiraTicket: bug.jiraTicket,
      createdAt: bug.createdAt?.toISOString() ?? new Date().toISOString(),
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
  await connectMongo();
  const plan = await TestPlanModel.findOne({ id: planId });
  if (!plan) return false;

  plan.status = "Approved";
  await plan.save();

  await pushHistory(`Admin menyetujui test plan ${plan.title}`);
  return true;
}

export async function updateTestCaseStatus(status: TestCaseStatus, testCaseId = "tc-api-009") {
  await connectMongo();
  await TestCaseModel.updateOne({ id: testCaseId }, { $set: { status } });
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
  await connectMongo();

  await BugModel.create({
    id: randomUUID(),
    testCaseId: input.testCaseId ?? "tc-api-009",
    title: input.title,
    severity: input.severity,
    priority: input.priority,
    jiraTicket: input.jiraTicket,
    steps: input.steps,
    expectedResult: input.expectedResult,
    actualResult: input.actualResult,
  });

  await pushHistory(`Bug baru dibuat: ${input.title} (${input.severity}/${input.priority})`);
}

export async function addComment(input: { user: string; message: string; testCaseId?: string }) {
  await connectMongo();

  await CommentModel.create({
    id: randomUUID(),
    testCaseId: input.testCaseId ?? "tc-api-009",
    user: input.user,
    message: input.message,
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  });

  await pushHistory(`${input.user} menambahkan komentar baru`);
}

export async function getPlanSummaryByStatus(status: PlanStatus) {
  await connectMongo();
  return TestPlanModel.countDocuments({ status });
}

export async function ensureDashboardHasData() {
  const existingProject = await ProjectModel.findOne({ id: "project-a" }).lean();
  if (existingProject) return;

  await ProjectModel.create({ id: "project-a", name: "Aplikasi A" });
}
