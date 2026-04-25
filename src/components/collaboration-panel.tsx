import { type Comment, type History } from "@/lib/types";

interface CollaborationPanelProps {
  comments: Comment[];
  histories: History[];
  addCommentAction: (formData: FormData) => Promise<void>;
}

export function CollaborationPanel({ comments, histories, addCommentAction }: CollaborationPanelProps) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">Kolaborasi & History</h3>
        <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">Mentions enabled</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">Komentar</p>
          <form action={addCommentAction} className="mb-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <input className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs" defaultValue="@qa-editor" name="user" />
            <textarea className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm" name="message" placeholder="Tulis komentar dan mention @anggota" rows={2} />
            <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white" type="submit">
              Kirim komentar
            </button>
          </form>

          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-slate-900">{comment.user}</p>
                <p className="text-slate-700">{comment.message}</p>
                <p className="mt-1 text-xs text-slate-500">{comment.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">History Log</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {histories.map((history) => (
              <li key={history.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <p>{history.action}</p>
                <p className="mt-1 text-xs text-slate-500">{new Date(history.timestamp).toLocaleString("id-ID")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
