import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "editor", "viewer"] }).notNull(),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const testPlans = sqliteTable("test_plans", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  owner: text("owner").notNull(),
  status: text("status", { enum: ["Draft", "In Review", "Approved"] }).notNull(),
  type: text("type").notNull(),
});

export const testCases = sqliteTable("test_cases", {
  id: text("id").primaryKey(),
  scenario: text("scenario").notNull(),
  title: text("title").notNull(),
  type: text("type", { enum: ["Manual", "Automation", "API"] }).notNull(),
  status: text("status", { enum: ["Untested", "Passed", "Failed"] }).notNull(),
  apiEndpoint: text("api_endpoint"),
  apiMethod: text("api_method"),
  steps: text("steps").notNull(),
  expectedResponse: text("expected_response"),
  jiraTicket: text("jira_ticket"),
});

export const bugs = sqliteTable("bugs", {
  id: text("id").primaryKey(),
  testCaseId: text("test_case_id").notNull().references(() => testCases.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  severity: text("severity", { enum: ["Low", "Medium", "High", "Critical"] }).notNull(),
  priority: text("priority", { enum: ["Low", "Medium", "High", "Urgent"] }).notNull(),
  steps: text("steps").notNull(),
  expectedResult: text("expected_result").notNull(),
  actualResult: text("actual_result").notNull(),
  jiraTicket: text("jira_ticket"),
  createdAt: text("created_at").notNull(),
});

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  testCaseId: text("test_case_id").notNull().references(() => testCases.id, { onDelete: "cascade" }),
  user: text("user").notNull(),
  message: text("message").notNull(),
  time: text("time").notNull(),
});

export const histories = sqliteTable("histories", {
  id: text("id").primaryKey(),
  action: text("action").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const migrations = sqliteTable("__migrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  runAt: text("run_at").notNull(),
});
