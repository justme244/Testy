import { randomUUID } from "node:crypto";

import {
  BugModel,
  CommentModel,
  HistoryModel,
  ProjectModel,
  TestCaseModel,
  TestPlanModel,
  UserModel,
} from "@/db/models";
import { connectMongo } from "@/lib/mongodb";

async function seed() {
  await connectMongo();

  await Promise.all([
    UserModel.deleteMany({}),
    ProjectModel.deleteMany({}),
    TestPlanModel.deleteMany({}),
    TestCaseModel.deleteMany({}),
    BugModel.deleteMany({}),
    CommentModel.deleteMany({}),
    HistoryModel.deleteMany({}),
  ]);

  await UserModel.insertMany([
    { id: "user-admin", name: "Admin Lead", role: "admin" },
    { id: "user-editor", name: "Rani Putri", role: "editor" },
    { id: "user-viewer", name: "Stakeholder", role: "viewer" },
  ]);

  await ProjectModel.insertMany([
    { id: "project-a", name: "Aplikasi A" },
    { id: "project-b", name: "Client Portal" },
  ]);

  await TestPlanModel.insertMany([
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
  ]);

  await TestCaseModel.create({
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
  });

  await BugModel.create({
    id: "bug-1",
    testCaseId: "tc-api-009",
    title: "Payment token null",
    severity: "Critical",
    priority: "Urgent",
    steps: "Jalankan checkout dengan kartu VISA valid di env staging.",
    expectedResult: "Token payment terbentuk sesuai format.",
    actualResult: "Response sukses namun payment_token bernilai null.",
    jiraTicket: "https://jira.example.com/TEST-321",
  });

  await CommentModel.insertMany([
    {
      id: randomUUID(),
      testCaseId: "tc-api-009",
      user: "@rani",
      message: "@backend-team tolong cek serializer payment_token, hasilnya null terus.",
      time: "10:32",
    },
    {
      id: randomUUID(),
      testCaseId: "tc-api-009",
      user: "@dimas",
      message: "Sudah saya reproduce, akan saya push fix ke branch hotfix/payment-token.",
      time: "10:47",
    },
  ]);

  await HistoryModel.insertMany([
    { id: randomUUID(), action: "Editor mengubah status test case menjadi Failed", timestamp: new Date().toISOString() },
    { id: randomUUID(), action: "System membuat draft bug report", timestamp: new Date().toISOString() },
    { id: randomUUID(), action: "Admin menandai prioritas sebagai Urgent", timestamp: new Date().toISOString() },
  ]);

  console.log("Seed completed");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
