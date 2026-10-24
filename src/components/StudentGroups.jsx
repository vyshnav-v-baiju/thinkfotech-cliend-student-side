import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import StudentGroupCard from "./StudentGroupCard";
import StudentGroupDetails from "./StudentGroupDetails";

/**
 * Student group listing and selected-group details.
 * Pass your existing groups array and handlers as props.
 * Each group may contain members, materials, certificateStatus, and certificateUrl.
 */
export default function StudentGroups({
  groups = [],
  onLeaveGroup,
  onGetCertificate,
}) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const types = useMemo(
    () => ["All", ...new Set(groups.map((group) => group.type).filter(Boolean))],
    [groups]
  );

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();
    return groups.filter((group) => {
      const matchesSearch = !query || [group.name, group.description, group.type]
        .some((value) => String(value || "").toLowerCase().includes(query));
      const matchesType = typeFilter === "All" || group.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [groups, search, typeFilter]);

  if (selectedGroup) {
    // Resolve the latest version from props if the group data has updated.
    const currentGroup = groups.find((group) => group.id === selectedGroup.id) || selectedGroup;
    return (
      <StudentGroupDetails
        group={currentGroup}
        members={currentGroup.members || []}
        materials={currentGroup.materials || []}
        certificateStatus={currentGroup.certificateStatus || "locked"}
        certificateUrl={currentGroup.certificateUrl}
        onBack={() => setSelectedGroup(null)}
        onLeaveGroup={onLeaveGroup}
        onGetCertificate={() => onGetCertificate?.(currentGroup)}
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl min-w-0">
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Learning space</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">My groups</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">View your programs, group members and shared learning resources.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your groups..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </label>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100">
          {types.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredGroups.map((group) => (
            <StudentGroupCard key={group.id} group={group} onViewDetails={setSelectedGroup} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500"><Users size={22} /></span>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">No groups found</h2>
          <p className="mt-2 text-sm text-slate-500">Try changing your search or filter.</p>
        </div>
      )}
    </main>
  );
}
