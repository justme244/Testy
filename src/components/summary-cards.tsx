interface SummaryCardsProps {
  projects: number;
  inReview: number;
  failedCases: number;
  criticalBugs: number;
}

const cardStyle =
  "rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)]";

export function SummaryCards({ projects, inReview, failedCases, criticalBugs }: SummaryCardsProps) {
  const stats = [
    { label: "Project Aktif", value: projects, hint: "1 utama + 1 maintenance" },
    { label: "In Review", value: inReview, hint: "Menunggu approval admin" },
    { label: "Failed Cases", value: failedCases, hint: "Perlu bug report & triage" },
    { label: "Critical Bugs", value: criticalBugs, hint: "Perlu eskalasi segera" },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article key={item.label} className={cardStyle}>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
          <p className="mt-2 text-xs text-slate-500">{item.hint}</p>
        </article>
      ))}
    </section>
  );
}
