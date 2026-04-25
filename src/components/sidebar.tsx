import {
  Bell,
  FileText,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: FileText, label: "Test Plans" },
  { icon: Bell, label: "Notifications" },
  { icon: GitBranch, label: "Integrations" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200/70 bg-white/85 p-5 backdrop-blur xl:flex">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 px-4 py-4 text-white shadow-lg">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-300">QA Workspace</p>
        <h1 className="mt-1 text-xl font-semibold">Testy</h1>
        <p className="mt-2 text-xs text-slate-200">Manajemen test plan, bug, dan approval dalam satu tempat.</p>
      </div>

      <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
        <p className="font-semibold text-slate-900">Role aktif</p>
        <p className="mt-1 text-slate-600">Editor (QA Engineer)</p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          RBAC enabled
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                item.active
                  ? "bg-sky-100 text-sky-900 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              type="button"
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-800">
          <LifeBuoy className="h-4 w-4" />
          <p className="font-semibold">Need help?</p>
        </div>
        <p className="mt-1">Akses onboarding checklist untuk tim QA baru.</p>
      </div>
    </aside>
  );
}
