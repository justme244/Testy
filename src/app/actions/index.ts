"use server";

import { revalidatePath } from "next/cache";

import { addComment, approvePlan, createBug, updateTestCaseStatus } from "@/lib/data-store";
import { type Priority, type Severity, type TestCaseStatus } from "@/lib/types";

export async function approvePlanAction(formData: FormData) {
  const planId = String(formData.get("planId") ?? "");
  if (!planId) return;

  await approvePlan(planId);
  revalidatePath("/");
}

export async function updateCaseStatusAction(formData: FormData) {
  const status = String(formData.get("status") ?? "Untested") as TestCaseStatus;
  const testCaseId = String(formData.get("testCaseId") ?? "tc-api-009");

  await updateTestCaseStatus(status, testCaseId);
  revalidatePath("/");
}

export async function createBugAction(formData: FormData) {
  await createBug({
    title: String(formData.get("title") ?? "Tanpa judul"),
    severity: String(formData.get("severity") ?? "Low") as Severity,
    priority: String(formData.get("priority") ?? "Low") as Priority,
    jiraTicket: String(formData.get("jiraTicket") ?? ""),
    steps: String(formData.get("steps") ?? ""),
    expectedResult: String(formData.get("expectedResult") ?? ""),
    actualResult: String(formData.get("actualResult") ?? ""),
    testCaseId: String(formData.get("testCaseId") ?? "tc-api-009"),
  });

  revalidatePath("/");
}

export async function addCommentAction(formData: FormData) {
  const user = String(formData.get("user") ?? "@qa-user");
  const message = String(formData.get("message") ?? "");
  const testCaseId = String(formData.get("testCaseId") ?? "tc-api-009");

  if (!message.trim()) return;

  await addComment({ user, message, testCaseId });
  revalidatePath("/");
}
