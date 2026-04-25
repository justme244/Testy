import { type Bug } from "@/lib/types";

interface BugReportFormProps {
  latestBug?: Bug;
  testCaseId: string;
  createBugAction: (formData: FormData) => Promise<void>;
}

export function BugReportForm({ latestBug, testCaseId, createBugAction }: BugReportFormProps) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Bug Reporting</p>
          <h3 className="text-lg font-semibold text-slate-900">Form Bug saat Test Gagal</h3>
        </div>
      </header>

      <form action={createBugAction} className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-xs font-medium text-slate-600 sm:col-span-2">
          Judul Bug
          <input className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm text-slate-900" defaultValue={latestBug?.title} name="title" />
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600">
          Severity
          <select className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm" defaultValue={latestBug?.severity ?? "Critical"} name="severity">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600">
          Priority
          <select className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm" defaultValue={latestBug?.priority ?? "Urgent"} name="priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600 sm:col-span-2">
          Jira Ticket
          <input className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm" defaultValue={latestBug?.jiraTicket} name="jiraTicket" />
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600 sm:col-span-2">
          Steps to Reproduce
          <textarea
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm"
            defaultValue={latestBug?.steps}
            name="steps"
            rows={2}
          />
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600">
          Expected Result
          <textarea
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm"
            defaultValue={latestBug?.expectedResult}
            name="expectedResult"
            rows={2}
          />
        </label>

        <label className="space-y-1 text-xs font-medium text-slate-600">
          Actual Result
          <textarea
            className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm"
            defaultValue={latestBug?.actualResult}
            name="actualResult"
            rows={2}
          />
        </label>

        <input name="testCaseId" type="hidden" value={testCaseId} />

        <button className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white sm:col-span-2" type="submit">
          Simpan Bug & Sinkron Jira
        </button>
      </form>
    </section>
  );
}
