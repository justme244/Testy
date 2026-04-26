import { approvePlanAction, addCommentAction, createBugAction, updateCaseStatusAction } from "@/app/actions";
import { BugReportForm } from "@/components/bug-report-form";
import { CollaborationPanel } from "@/components/collaboration-panel";
import { Sidebar } from "@/components/sidebar";
import { SummaryCards } from "@/components/summary-cards";
import { TestCaseDetail } from "@/components/test-case-detail";
import { TestPlanBoard } from "@/components/test-plan-board";
import { getDashboardData } from "@/lib/data-store";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Project: {data.projectName}</p>
              <h1 className="text-2xl font-bold text-slate-900">QA Test Management Workspace</h1>
              <p className="mt-1 text-sm text-slate-600">
                Backend terintegrasi via Server Actions + API Routes untuk approval, status test, bug report, dan komentar.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              Role Access: {data.activeRoles.join(" • ")}
            </div>
          </div>
        </header>

        <div className="space-y-5">
          <SummaryCards
            criticalBugs={data.bugs.filter((bug) => bug.severity === "Critical").length}
            failedCases={data.testCase.status === "Failed" ? 1 : 0}
            inReview={data.plans.filter((plan) => plan.status === "In Review").length}
            projects={2}
          />
          <TestPlanBoard approvePlanAction={approvePlanAction} plans={data.plans} />

          <div className="grid gap-5 2xl:grid-cols-2">
            <TestCaseDetail testCase={data.testCase} updateCaseStatusAction={updateCaseStatusAction} />
            <BugReportForm createBugAction={createBugAction} latestBug={data.bugs[0]} testCaseId={data.testCase.id} />
          </div>

          <CollaborationPanel
            addCommentAction={addCommentAction}
            comments={data.comments}
            histories={data.histories}
            testCaseId={data.testCase.id}
          />
        </div>
      </div>
    </main>
  );
}
