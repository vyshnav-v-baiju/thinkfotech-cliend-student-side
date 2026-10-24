


import { useEffect, useState } from "react";

import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";
import StudentBottomNav from "../components/StudentBottomNav";
import StudentGroupCard from "../components/StudentGroupCard";
import JoinGroupModal from "../components/JoinGroupModal";
import StudentGroupDetails from "../components/StudentGroupDetails";
import StudentProfile from "../components/StudentProfile";
import { ArrowBigLeft, ArrowRight, PlusIcon } from "lucide-react";

const INITIAL_GROUPS = [
  {
    id: 1,
    name: "E-commerce Web Application",
    type: "Project",
    description:
      "Build a modern e-commerce application with product listings, user authentication, shopping cart, and order management.",
    members: [
      { id: 101, name: "Alex Johnson", email: "alex@example.com" },
      { id: 102, name: "Sam Wilson", email: "sam@example.com" },
      { id: 103, name: "Taylor Smith", email: "taylor@example.com" },
    ],
    materialCount: 2,
    materials: [
      {
        id: 1,
        name: "Project Requirements",
        description: "Project scope and functional requirements.",
        type: "link",
        url: "",
      },
      {
        id: 2,
        name: "Getting Started Guide",
        description: "Initial setup and development instructions.",
        type: "file",
        url: "",
      },
    ],
    certificate: {
      available: false,
      url: "",
    },
  },
  {
    id: 2,
    name: "Python Full Stack Internship",
    type: "Internship",
    description:
      "Develop practical skills through Python, Django, databases, and frontend development tasks.",
    members: [
      { id: 201, name: "Jordan Lee", email: "jordan@example.com" },
      { id: 202, name: "Morgan Davis", email: "morgan@example.com" },
    ],
    materialCount: 0,
    materials: [],
    certificate: {
      available: false,
      url: "",
    },
  },
  {
    id: 3,
    name: "React Development Training",
    type: "Training",
    description:
      "Learn React fundamentals, reusable components, hooks, routing, and modern frontend development.",
    members: [
      { id: 301, name: "Casey Brown", email: "casey@example.com" },
      { id: 302, name: "Riley Thomas", email: "riley@example.com" },
    ],
    materialCount: 1,
    materials: [
      {
        id: 3,
        name: "React Learning Resources",
        description: "Useful resources for your training sessions.",
        type: "link",
        url: "",
      },
    ],
    certificate: {
      available: false,
      url: "",
    },
  },
];

const SAMPLE_AVAILABLE_GROUPS = [
  {
    id: 4,
    code: "REACT2026",
    name: "Advanced React Workshop",
    type: "Training",
    description:
      "Explore advanced React patterns, performance optimization, and reusable architecture.",
    materialCount: 0,
    materials: [],
    certificate: { available: false, url: "" },
  },
  {
    id: 5,
    code: "DJANGO2026",
    name: "Django API Development",
    type: "Project",
    description:
      "Practice building REST APIs with Django REST Framework and connecting frontend applications.",
    materialCount: 0,
    materials: [],
    certificate: { available: false, url: "" },
  },
];

export default function Students() {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [activePage, setActivePage] = useState("home");
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const [student, setStudent] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "",
    course: "Computer Applications",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const navigateTo = (page) => {
    setSelectedGroup(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const findGroupByCode = async (code) => {
    return SAMPLE_AVAILABLE_GROUPS.find(
      (group) => group.code.toLowerCase() === code.toLowerCase()
    ) ?? null;
  };

  const handleLeaveGroup = (groupId) => {
    setGroups((previous) => previous.filter((group) => group.id !== groupId));
    setSelectedGroup(null);
  };

  const joinGroup = (group) => {
    const alreadyJoined = groups.some(
      (existingGroup) => existingGroup.id === group.id
    );

    if (alreadyJoined) {
      window.alert("You have already joined this group.");
      return;
    }

    const { code, ...groupDetails } = group;

    setGroups((previous) => [...previous, groupDetails]);
    setActivePage("groups");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      groupFilter === "All" || group.type === groupFilter;

    return matchesSearch && matchesFilter;
  });

  const pageTitle = {
    home: "Dashboard",
    groups: "My Groups",
    profile: "My Profile",
  }[activePage];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-white">
      <StudentHeader
        studentName={student.name}
        isDark={isDark}
        onToggleTheme={() => setIsDark((previous) => !previous)}
      />

      <div className="mx-auto flex max-w-[1440px] gap-6 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-8">
        <StudentSidebar activePage={activePage} onNavigate={navigateTo} />
        <main className="min-w-0 flex-1">
          {selectedGroup ? (
            <StudentGroupDetails
              group={selectedGroup}
              members={selectedGroup.members ?? []}
              materials={selectedGroup.materials ?? []}
              certificateStatus={
                selectedGroup.certificate?.available ? "approved" : "locked"
              }
              certificateUrl={selectedGroup.certificate?.url}
              onBack={() => setSelectedGroup(null)}
              onLeaveGroup={handleLeaveGroup}
              onGetCertificate={() => {
                if (selectedGroup.certificate?.url) {
                  window.open(selectedGroup.certificate.url, "_blank", "noopener,noreferrer");
                }
              }}
            />
          ) : (
            <>
          {/* Page heading */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Student Portal / {pageTitle}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {pageTitle}
              </h1>
            </div>

            {activePage !== "profile" && (
              <button
                type="button"
                onClick={() => setIsJoinOpen(true)}
                className="inline-flex items-center gap-2 rounded-3xl bg-brand-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <span className="text-lg"><PlusIcon/></span>
                Join group
              </button>
            )}
          </div>

          {/* Dashboard */}
          {activePage === "home" && (
            <>
            
<section className="relative mb-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
  {/* Decorative background */}
  <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-900/20" />
  <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-900/20" />

  <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
    {/* Welcome content */}
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-900/60 dark:bg-blue-950/50">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
          YOUR LEARNING SPACE
        </span>
      </div>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px] lg:leading-tight">
        Welcome back,{" "}
        <span className="text-blue-700 dark:text-blue-400">
          {student.name.split(" ")[0]}
        </span>
        .
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
        Your next big achievement starts here. Continue your projects,
        explore learning resources, and keep moving towards your goals.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigateTo("groups")}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          Explore my groups
          <span aria-hidden="true " className="size-5"><ArrowRight/></span>
        </button>

        <button
          type="button"
          onClick={() => setIsJoinOpen(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-brand-950 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-white hover:bg-gradient-to-br from-brand-700 to-brand-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-slate-800"
        >
          <PlusIcon/>
          Join with access code
        </button>
      </div>
    </div>

    {/* Decorative learning illustration */}
    <div className="hidden lg:flex lg:items-center lg:justify-center">
      <div className="relative flex h-44 w-44 items-center justify-center rounded-[36px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950">
        <div className="absolute -right-3 -top-3 h-10 w-10 rounded-2xl border border-blue-100 bg-white dark:border-slate-700 dark:bg-slate-800" />
        <div className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full bg-blue-600" />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="78"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-700 dark:text-blue-400"
          aria-hidden="true"
        >
          <path d="M2 10 12 5l10 5-10 5-10-5Z" />
          <path d="M6 12v5c3.5 3 8.5 3 12 0v-5" />
          <path d="M22 10v6" />
        </svg>
      </div>
    </div>
  </div>

  {/* Bottom information strip */}
  <div className="relative border-t border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/60 sm:px-8 lg:px-10">
    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
      <span className="font-semibold text-slate-700 dark:text-slate-200">
        Keep learning. Keep building.
      </span>{" "}
      Your projects and learning resources are just a click away.
    </p>
  </div>
</section>

              <section>
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">My Groups</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Your projects, internships, and training.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateTo("groups")}
                    className="shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300"
                  >
                    View all 
                  </button>
                </div>

                {groups.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {groups.slice(0, 3).map((group) => (
                      <StudentGroupCard
                        key={group.id}
                        group={group}
                        onViewDetails={setSelectedGroup}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyGroups onJoin={() => setIsJoinOpen(true)} />
                )}
              </section>

              <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="font-semibold">Stay up to date</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  New learning materials, announcements, and certificate
                  updates can appear here when staff shares them.
                </p>
              </section>
            </>
          )}

          {/* All groups */}
          {activePage === "groups" && (
            <section>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search your groups..."
                  aria-label="Search groups"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950"
                />

                <select
                  value={groupFilter}
                  onChange={(event) => setGroupFilter(event.target.value)}
                  aria-label="Filter groups by type"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950"
                >
                  <option>All</option>
                  <option>Project</option>
                  <option>Internship</option>
                  <option>Training</option>
                </select>
              </div>

              {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredGroups.map((group) => (
                    <StudentGroupCard
                      key={group.id}
                      group={group}
                      onViewDetails={setSelectedGroup}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-950">
                  <h2 className="font-semibold">No groups found</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Try a different search or join a group using an access code.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsJoinOpen(true)}
                    className="mt-5 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Join a group
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Profile */}
          {activePage === "profile" && <StudentProfile/>}

            </>
          )}
        </main>
      </div>

      <StudentBottomNav
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <JoinGroupModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        findGroupByCode={findGroupByCode}
        onJoin={joinGroup}
      />


    </div>
  );
}

function ProfileField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900"
      />
    </label>
  );
}

function EmptyGroups({ onJoin }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-950">
      <h3 className="font-semibold">Your learning journey starts here</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        Join a project, internship, or training group using the access code
        provided by your staff member.
      </p>

      <button
        type="button"
        onClick={onJoin}
        className="mt-5 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Join your first group
      </button>
    </div>
  );
}
