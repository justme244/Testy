import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], required: true },
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const testPlanSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    projectId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, enum: ["Draft", "In Review", "Approved"], required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const testCaseSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    scenario: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["Manual", "Automation", "API"], required: true },
    status: { type: String, enum: ["Untested", "Passed", "Failed"], required: true },
    apiEndpoint: { type: String },
    apiMethod: { type: String },
    steps: [{ type: String, required: true }],
    expectedResponse: { type: String },
    jiraTicket: { type: String },
  },
  { timestamps: true }
);

const bugSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    testCaseId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
    priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], required: true },
    steps: { type: String, required: true },
    expectedResult: { type: String, required: true },
    actualResult: { type: String, required: true },
    jiraTicket: { type: String },
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    testCaseId: { type: String, required: true, index: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const historySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    action: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", userSchema);
export const ProjectModel = models.Project || model("Project", projectSchema);
export const TestPlanModel = models.TestPlan || model("TestPlan", testPlanSchema);
export const TestCaseModel = models.TestCase || model("TestCase", testCaseSchema);
export const BugModel = models.Bug || model("Bug", bugSchema);
export const CommentModel = models.Comment || model("Comment", commentSchema);
export const HistoryModel = models.History || model("History", historySchema);
