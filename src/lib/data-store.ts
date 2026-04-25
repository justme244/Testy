import { randomUUID } from "node:crypto";

import {
  type Bug,
  type Comment,
  type DashboardData,
  type History,
  type PlanStatus,
  type Priority,
  type Severity,
  type TestCase,
  type TestCaseStatus,
  type TestPlan,
} from "@/lib/types";

const plans: TestPlan[] = [
  {
    id: "plan-1",
    projectId: "project-a",
    title: "Regression Sprint 12",
    owner: "Rani Putri",
    status: "In Review",
    type: "Hybrid (UI + API)",
  },
  {
    id: "plan-2",
    projectId: "project-a",
    title: "Smoke Checkout",
    owner: "Gilang",
    status: "Approved",
    type: "Automation",
  },
  {
    id: "plan-3",
    projectId: "project-b",
    title: "API Contract Billing",
    owner: "Dinda",
    status: "Draft",
    type: "API",
  },
];

const testCase: TestCase = {
  id: "tc-api-009",
  scenario: "Checkout payment",
  title: "TC-API-009 · Checkout with Valid Card",
  type: "API",
  status: "Failed",
  apiEndpoint: "/api/v1/checkout",
  apiMethod: "POST",
  steps: [
    "Login sebagai user Editor",
    "Pilih project Aplikasi A",
    "Jalankan endpoint POST /api/v1/checkout",
    "Validasi response 200 + field payment_token",
  ],
  expectedResponse: '{\n  "status": "success",\n  "payment_token": "tok_xxxxx"\n}',
  jiraTicket: "https://jira.example.com/TEST-321",
};

const bugs: Bug[] = [
  {
    id: "bug-1",
    testCaseId: testCase.id,
    title: "Payment token null",
    severity: "Critical",
    priority: "Urgent",
    steps: "Jalankan checkout dengan kartu VISA valid di env staging.",
    expectedResult: "Token payment terbentuk sesuai format.",
    actualResult: "Response sukses namun payment_token bernilai null.",
    jiraTicket: "https://jira.example.com/TEST-321",
    createdAt: new Date().toISOString(),
  },
];

const comments: Comment[] = [
  {
    id: "comment-1",
    testCaseId: testCase.id,
    user: "@rani",
    message: "@backend-team tolong cek serializer payment_token, hasilnya null terus.",
    time: "10:32",
  },
  {
    id: "comment-2",
    testCaseId: testCase.id,
    user: "@dimas",
    message: "Sudah saya reproduce, akan saya push fix ke branch hotfix/payment-token.",
    time: "10:47",
  },
];

const histories: History[] = [
  {
    id: "hist-1",
    action: "Editor mengubah status test case menjadi Failed",
    timestamp: new Date().toISOString(),
  },
  {
    id: "hist-2",
    action: "System membuat draft bug report",
    timestamp: new Date().toISOString(),
  },
  {
    id: "hist-3",
    action: "Admin menandai prioritas sebagai Urgent",
    timestamp: new Date().toISOString(),
  },
];

function pushHistory(action: string) {
  histories.unshift({ id: randomUUID(), action, timestamp: new Date().toISOString() });
}

export function getDashboardData(): DashboardData {
  return {
    projectName: "Aplikasi A · Sprint 12",
    activeRoles: ["Admin", "Editor", "Viewer"],
    plans,
    testCase,
    bugs,
    comments,
    histories,
  };
}

export function approvePlan(planId: string) {
  const plan = plans.find((item) => item.id === planId);
  if (!plan) return false;

  plan.status = "Approved";
  pushHistory(`Admin menyetujui test plan ${plan.title}`);
  return true;
}

export function updateTestCaseStatus(status: TestCaseStatus) {
  testCase.status = status;
  pushHistory(`Editor mengubah status test case menjadi ${status}`);
}

export function createBug(input: {
  title: string;
  severity: Severity;
  priority: Priority;
  jiraTicket?: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
}) {
  bugs.unshift({
    id: randomUUID(),
    testCaseId: testCase.id,
    title: input.title,
    severity: input.severity,
    priority: input.priority,
    jiraTicket: input.jiraTicket,
    steps: input.steps,
    expectedResult: input.expectedResult,
    actualResult: input.actualResult,
    createdAt: new Date().toISOString(),
  });

  pushHistory(`Bug baru dibuat: ${input.title} (${input.severity}/${input.priority})`);
}

export function addComment(input: { user: string; message: string }) {
  comments.unshift({
    id: randomUUID(),
    testCaseId: testCase.id,
    user: input.user,
    message: input.message,
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  });

  pushHistory(`${input.user} menambahkan komentar baru`);
}

export function getPlanSummaryByStatus(status: PlanStatus) {
  return plans.filter((plan) => plan.status === status).length;
}
