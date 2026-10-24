import { useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  LockKeyhole,
  LogOut,
  Users,
  X,
} from "lucide-react";

function SectionCard({ children, className = "" }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-600 bg-brand-50 text-brand-800">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold leading-snug text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function getMaterialTitle(material) {
  return material.title || material.name || "Untitled material";
}

function getMaterialUrl(material) {
  return material.downloadUrl || material.fileUrl || material.url || null;
}

export default function StudentGroupDetails({
  group,
  members = [],
  materials = [],
  certificateStatus = "locked", // "locked", "pending", or "approved"
  certificateUrl,
  onBack,
  onLeaveGroup,
  onGetCertificate,
}) {
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leaving, setLeaving] = useState(false);

  if (!group) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">Group not found</h2>
        <p className="mt-2 text-sm text-slate-500">This group may no longer be available.</p>
        <button onClick={onBack} className="mt-5 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
          <ArrowLeft className="mr-2 inline" size={17} /> Back to groups
        </button>
      </div>
    );
  }

  const approved = certificateStatus === "approved";
  const pending = certificateStatus === "pending";

  async function handleLeave() {
    if (!onLeaveGroup || leaving) return;
    setLeaving(true);
    try {
      await onLeaveGroup(group.id);
      setConfirmLeave(false);
    } finally {
      setLeaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-brand-700">MY GROUPS</p>
          <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {group.name || "Group details"}
          </h1>
          <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-slate-600 sm:text-base">
            {group.description || "View group members, learning resources and certificate status."}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-600 hover:bg-brand-50"
        >
          <ArrowLeft size={17} /> My groups
        </button>
      </header>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard>
          <SectionHeading icon={Users} title="Group overview" subtitle={`${group.type || "Program"} · ${members.length} ${members.length === 1 ? "member" : "members"}`} />
          <p className="mt-4 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
            {group.description || "No group description is available yet."}
          </p>
        </SectionCard>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex min-h-36 flex-col justify-around rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 p-5 text-white">
            <span className="text-sm text-brand-50">Group members</span>
            <span className="text-5xl font-bold">{members.length}</span>
            {/* <span className="text-xs text-brand-100">People in this group</span> */}
          </div>
          <div className="flex min-h-36 flex-col justify-around rounded-2xl border border-slate-200 bg-white p-5 text-slate-900">
            <span className="text-sm text-slate-500">Study materials</span>
            <span className="text-5xl font-bold">{materials.length}</span>
            {/* <span className="text-xs text-slate-500">Shared resources</span> */}
          </div>
        </div>

        <SectionCard>
          <SectionHeading icon={Users} title="Group members" subtitle="People participating in this group" />
          {members.length > 0 ? (
            <ul className="mt-4 divide-y divide-slate-100">
              {members.map((member, index) => (
                <li key={member.id ?? member.email ?? `${member.name}-${index}`} className="flex min-w-0 items-center gap-3 py-3">
                  {member.image || member.avatar ? (
                    <img src={member.image || member.avatar} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-800">
                      {(member.name || "M").trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{member.name || member.username || "Group member"}</p>
                    {member.email && <p className="mt-1 truncate text-sm text-slate-500">{member.email}</p>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No member information is available.</p>
          )}
        </SectionCard>

        <SectionCard>
          <SectionHeading icon={BookOpen} title="Study materials" subtitle="Resources shared with this group" />
          {materials.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {materials.map((material, index) => {
                const title = getMaterialTitle(material);
                const url = getMaterialUrl(material);
                const downloadable = Boolean(material.downloadUrl || material.fileUrl);
                return (
                  <li key={material.id ?? `${title}-${index}`} className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-800 ring-1 ring-slate-200">
                      <FileText size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">{material.type || "Study resource"}</p>
                    </div>
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" aria-label={`${downloadable ? "Download" : "Open"} ${title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-brand-800 hover:bg-brand-100">
                        {downloadable ? <Download size={18} /> : <ExternalLink size={18} />}
                      </a>
                    ) : <LockKeyhole size={18} className="shrink-0 text-slate-400" />}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No study materials have been added to this group yet.</p>
          )}
        </SectionCard>

        <SectionCard>
          <SectionHeading icon={Award} title="Certificate" subtitle="Available after program completion and admin approval" />
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              {approved ? <Award size={21} className="mt-0.5 shrink-0 text-brand-700" /> : <LockKeyhole size={21} className="mt-0.5 shrink-0 text-slate-500" />}
              <div>
                <p className="text-sm font-semibold text-slate-900">{approved ? "Certificate approved" : pending ? "Waiting for admin approval" : "Certificate locked"}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {approved ? "Your certificate is approved and ready." : pending ? "Your certificate is waiting for admin approval." : "Complete the program first. The certificate will be enabled after admin approval."}
                </p>
              </div>
            </div>
            {approved ? (
              certificateUrl ? (
                <a href={certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800">
                  <Download size={17} /> Get certificate
                </a>
              ) : (
                <button type="button" onClick={onGetCertificate} disabled={!onGetCertificate} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">
                  <Download size={17} /> Get certificate
                </button>
              )
            ) : (
              <button type="button" disabled className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500">
                <LockKeyhole size={17} /> Get certificate
              </button>
            )}
          </div>
        </SectionCard>

        <SectionCard className="border-red-100  ">
          <SectionHeading icon={LogOut} title="Leave group" subtitle="You may lose access to this group's study materials." />
          <button type="button" onClick={() => setConfirmLeave(true)} disabled={!onLeaveGroup} className="mt-5 inline-flex right-0 items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
            <LogOut size={17} /> Leave group
          </button>
        </SectionCard>
      </div>

      {confirmLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={() => !leaving && setConfirmLeave(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="leave-group-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-700"><LogOut size={21} /></span>
              <button type="button" aria-label="Close confirmation" onClick={() => setConfirmLeave(false)} disabled={leaving} className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"><X size={18} /></button>
            </div>
            <h3 id="leave-group-title" className="mt-4 text-xl font-bold text-slate-900">Leave this group?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">You will leave <strong>{group.name}</strong> and may lose access to its study materials.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setConfirmLeave(false)} disabled={leaving} className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Keep group</button>
              <button type="button" onClick={handleLeave} disabled={leaving} className="rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">{leaving ? "Leaving..." : "Yes, leave"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
