import { ArrowRight, BookOpen, Users } from "lucide-react";

export default function StudentGroupCard({ group, onViewDetails }) {
  const memberCount = group.memberCount ?? group.members?.length ?? 0;
  const materialCount = group.materialCount ?? group.materials?.length ?? 0;

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800">
          <Users size={22} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-xl font-semibold leading-snug text-slate-900">
            {group.name || "Untitled group"}
          </h2>
          <span className="mt-2 inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
            {group.type || "Program"}
          </span>
        </div>
      </div>

      <p className="mt-4 flex-1 break-words text-sm leading-6 text-slate-600">
        {group.description || "No description is available for this group yet."}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users size={17} className="shrink-0 text-slate-500" />
          <span>{memberCount} {memberCount === 1 ? "member" : "members"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <BookOpen size={17} className="shrink-0 text-slate-500" />
          <span>{materialCount} {materialCount === 1 ? "material" : "materials"}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails?.(group)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-600 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
      >
        View details <ArrowRight size={16} />
      </button>
    </article>
  );
}
