export type UserRole = "admin" | "editor" | "viewer";
export type PlanStatus = "Draft" | "In Review" | "Approved";
export type TestCaseType = "Manual" | "Automation" | "API";
export type TestCaseStatus = "Untested" | "Passed" | "Failed";
export type Severity = "Low" | "Medium" | "High" | "Critical";
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
}

export interface TestPlan {
  id: string;
  projectId: string;
  title: string;
  owner: string;
  status: PlanStatus;
  type: string;
}

export interface TestCase {
  id: string;
  scenario: string;
  title: string;
  type: TestCaseType;
  status: TestCaseStatus;
  apiEndpoint?: string;
  apiMethod?: string;
  steps: string[];
  expectedResponse?: string;
  jiraTicket?: string;
}

export interface Bug {
  id: string;
  testCaseId: string;
  title: string;
  severity: Severity;
  priority: Priority;
  steps: string;
  expectedResult: string;
  actualResult: string;
  jiraTicket?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  testCaseId: string;
  user: string;
  message: string;
  time: string;
}

export interface History {
  id: string;
  action: string;
  timestamp: string;
}

export interface DashboardData {
  projectName: string;
  activeRoles: string[];
  plans: TestPlan[];
  testCase: TestCase;
  bugs: Bug[];
  comments: Comment[];
  histories: History[];
}
