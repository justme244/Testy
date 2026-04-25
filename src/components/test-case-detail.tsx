import { type TestCase } from "@/lib/types";

interface TestCaseDetailProps {
  testCase: TestCase;
  updateCaseStatusAction: (formData: FormData) => Promise<void>;
}

export function TestCaseDetail({ testCase, updateCaseStatusAction }: TestCaseDetailProps) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Test Case Detail</p>
          <h3 className="text-lg font-semibold text-slate-900">{testCase.title}</h3>
        </div>
        <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">{testCase.status}</span>
      </header>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs uppercase text-slate-500">Type</dt>
          <dd className="font-medium text-slate-900">{testCase.type}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs uppercase text-slate-500">Scenario</dt>
          <dd className="font-medium text-slate-900">{testCase.scenario}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs uppercase text-slate-500">Endpoint</dt>
          <dd className="font-medium text-slate-900">{testCase.apiEndpoint}</dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <dt className="text-xs uppercase text-slate-500">Method</dt>
          <dd className="font-medium text-slate-900">{testCase.apiMethod}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-xl border border-slate-200 p-3">
        <p className="mb-2 text-sm font-semibold text-slate-800">Langkah Pengujian</p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {testCase.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <form action={updateCaseStatusAction} className="mt-4 flex flex-wrap items-center gap-2">
        <input name="status" type="hidden" value="Passed" />
        <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white" type="submit">
          Mark Passed
        </button>
      </form>

      <div className="mt-4 rounded-xl bg-slate-900 p-3 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Expected Response</p>
        <pre className="mt-2 overflow-x-auto text-xs">{testCase.expectedResponse}</pre>
      </div>
    </section>
  );
}
