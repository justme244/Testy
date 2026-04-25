import { CheckCircle2, Clock3, FileSearch } from "lucide-react";

import { type TestPlan } from "@/lib/types";

const statusClass: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  "In Review": "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
};

interface TestPlanBoardProps {
  plans: TestPlan[];
  approvePlanAction: (formData: FormData) => Promise<void>;
}

export function TestPlanBoard({ plans, approvePlanAction }: TestPlanBoardProps) {
  const draft = plans.filter((plan) => plan.status === "Draft").length;
  const inReview = plans.filter((plan) => plan.status === "In Review").length;
  const approved = plans.filter((plan) => plan.status === "Approved").length;

  return (
    <section className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Test Plan Pipeline</h2>
          <p className="text-sm text-slate-500">Hierarki: Project → Plan → Scenario → Test Case</p>
        </div>
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="flex items-center gap-2 font-semibold text-slate-900">
            <FileSearch className="h-4 w-4 text-slate-500" /> {draft} Draft
          </p>
          <p className="text-xs text-slate-500">Belum diajukan approval</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          <p className="flex items-center gap-2 font-semibold">
            <Clock3 className="h-4 w-4" /> {inReview} In Review
          </p>
          <p className="text-xs text-amber-700">Menunggu validasi Admin</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
          <p className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-4 w-4" /> {approved} Approved
          </p>
          <p className="text-xs text-emerald-700">Siap dieksekusi QA</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="pb-2">Project</th>
              <th className="pb-2">Judul Plan</th>
              <th className="pb-2">Owner</th>
              <th className="pb-2">Jenis Test</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="py-3 text-slate-700">{plan.projectId === "project-a" ? "Aplikasi A" : "Client Portal"}</td>
                <td className="py-3 font-medium text-slate-900">{plan.title}</td>
                <td className="py-3 text-slate-700">{plan.owner}</td>
                <td className="py-3 text-slate-700">{plan.type}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass[plan.status]}`}>
                    {plan.status}
                  </span>
                </td>
                <td className="py-3">
                  {plan.status !== "Approved" ? (
                    <form action={approvePlanAction}>
                      <input name="planId" type="hidden" value={plan.id} />
                      <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white" type="submit">
                        Approve
                      </button>
                    </form>
                  ) : (
                    <span className="text-xs text-emerald-600">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
