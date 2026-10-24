// import { Settings } from "lucide-react";
// import { useEffect, useState } from "react";

// const INITIAL_STUDENT = {
//   name: "Alex Johnson",
//   studentId: "TF-STU-2026-001",
//   course: "Computer Applications",
//   email: "alex@example.com",
//   phone: "",
//   joinedDate: "October 2026",
//   photo: "",
// };

// const inputClass =
//   "w-full rounded-full border border-[#E4E5E8] bg-[#F7F6F3] px-5 py-3 text-sm text-[#101B35] outline-none transition placeholder:text-[#A3ACBA] focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

// function Icon({ name, className = "h-5 w-5" }) {
//   const paths = {
//     plus: <path d="M12 5v14M5 12h14" />,
//     settings: (
//       <>
//         <circle cx="12" cy="12" r="3" />
//         <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2H15v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" />
//       </>
//     ),
//     edit: (
//       <>
//         <path d="M4 20h4L19 9l-4-4L4 16z" />
//         <path d="m13.5 6.5 4 4" />
//       </>
//     ),
//     copy: (
//       <>
//         <rect x="9" y="9" width="11" height="11" rx="2" />
//         <path d="M5 15V6a2 2 0 0 1 2-2h9" />
//       </>
//     ),
//     check: <path d="m5 12 4 4L19 6" />,
//     close: <path d="m18 6-12 12M6 6l12 12" />,
//     alert: (
//       <>
//         <path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" />
//         <path d="M12 9v4M12 16h.01" />
//       </>
//     ),
//     camera: (
//       <>
//         <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
//         <circle cx="12" cy="13" r="3.5" />
//       </>
//     ),
//   };

//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//       aria-hidden="true"
//     >
//       {paths[name]}
//     </svg>
//   );
// }

// export default function StudentProfile() {
//   const [student, setStudent] = useState(INITIAL_STUDENT);
//   const [draft, setDraft] = useState(INITIAL_STUDENT);
//   const [editing, setEditing] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (!message) return;
//     const t = setTimeout(() => setMessage(null), 6000);
//     return () => clearTimeout(t);
//   }, [message]);

//   useEffect(() => {
//     if (!editing && !confirmDelete) return;
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setEditing(false);
//         setConfirmDelete(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [editing, confirmDelete]);

//   const openSettings = () => {
//     setDraft({ ...student });
//     setMessage(null);
//     setEditing(true);
//   };

//   const saveProfile = (event) => {
//     event.preventDefault();
//     setStudent({ ...draft });
//     setEditing(false);
//     setMessage({
//       type: "success",
//       text: "Profile changes saved for this session.",
//     });
//   };

//   const updateDraft = (field, value) =>
//     setDraft((previous) => ({ ...previous, [field]: value }));

//   const handlePhoto = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
//       setMessage({ type: "error", text: "Choose an image smaller than 5 MB." });
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => updateDraft("photo", String(reader.result));
//     reader.readAsDataURL(file);
//   };

//   const copyStudentId = async () => {
//     try {
//       await navigator.clipboard.writeText(student.studentId);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1800);
//     } catch {
//       setMessage({
//         type: "error",
//         text: "Couldn't copy. Please copy it manually.",
//       });
//     }
//   };

//   // UI confirmation only. Actual account deletion needs backend support.
//   const confirmAccountDeletion = () => {
//     setConfirmDelete(false);
//     setMessage({
//       type: "info",
//       text: "Account deletion is not connected yet. Please contact Thinkfotech support to delete your account.",
//     });
//   };

//   const initials =
//     student.name
//       .trim()
//       .split(/\s+/)
//       .slice(0, 2)
//       .map((part) => part.charAt(0).toUpperCase())
//       .join("") || "S";

//   return (
//     <div className="mx-auto max-w-4xl text-[#101B35] dark:text-white">
//       {/* Page heading, same pattern as the rest of the dashboard */}
//       {/* <header>
//         <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Profile</h1>
//         <p className="mt-2 text-base text-[#718096] dark:text-slate-400">
//           Manage your personal details and account.
//         </p>
//       </header> */}

//       {message && (
//         <div
//           role="status"
//           className={`mt-6 flex items-start justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm ${
//             message.type === "success"
//               ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
//               : message.type === "error"
//                 ? "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200"
//                 : "bg-[#E6EEFF] text-[#173D7A] dark:bg-slate-800 dark:text-blue-200"
//           }`}
//         >
//           <span>{message.text}</span>
//           <button
//             type="button"
//             onClick={() => setMessage(null)}
//             aria-label="Dismiss message"
//             className="shrink-0 opacity-70 hover:opacity-100"
//           >
//             <Icon name="close" className="h-4 w-4" />
//           </button>
//         </div>
//       )}

//       {/* Identity card — no background banner */}
//       <section className="mt-8 rounded-[28px] bg-white p-5 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
//         <div className="flex min-w-0 items-center gap-4 sm:gap-5">
//           <div className="relative shrink-0">
//             <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[26px] border-4 border-white bg-[#EAF1FF] text-3xl font-semibold text-[#17448F] shadow-[0_4px_12px_rgba(16,27,53,0.12)] sm:h-[120px] sm:w-[120px] sm:text-4xl dark:border-slate-800 dark:bg-slate-800 dark:text-blue-300">
//               {student.photo ? (
//                 <img
//                   src={student.photo}
//                   alt={`${student.name}'s profile`}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 initials
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={openSettings}
//               aria-label="Change profile photo"
//               className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#153A80] text-white transition hover:bg-[#0D2B61] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 dark:border-slate-950"
//             >
//               <Icon name="camera" className="h-[17px] w-[17px]" />
//             </button>
//           </div>

//           <div className="flex min-w-0 flex-1 items-start justify-between gap-2 pb-1 sm:items-end sm:pb-2">
//             <div className="min-w-0">
//               <h2 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
//                 {student.name}
//               </h2>
//               <p className="mt-1 truncate text-sm text-[#718096] dark:text-slate-400 sm:text-[15px]">
//                 {student.email}
//               </p>
//               <div className="mt-2 flex flex-wrap items-center gap-2">
//                 {/* <span className="rounded-full bg-[#DCE8FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300">
//                     Active
//                   </span> */}
//                 {/* <span className="rounded-full bg-[#F1EFEA] px-3 py-1 text-xs font-semibold text-[#59677F] dark:bg-slate-800 dark:text-slate-300">
//                     Student
//                   </span> */}
//               </div>
//             </div>

//             {/* Mobile: settings icon beside the name. Desktop: Edit profile button. */}
//             <button
//               type="button"
//               onClick={openSettings}
//               aria-label="Profile settings"
//               title="Profile settings"
//               className="-mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8DDE6] bg-white text-[#153A80] transition hover:bg-[#EAF1FF] sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300"
//             >
//               <Settings />
//             </button>
//           </div>

//           <button
//             type="button"
//             onClick={openSettings}
//             className="hidden w-fit shrink-0 items-center gap-2 rounded-full bg-[#0F3175] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#0A2557] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:inline-flex"
//           >
//             <Icon name="edit" className="h-[18px] w-[18px]" />
//             Edit profile
//           </button>
//         </div>
//       </section>

//       {/* Personal details */}
//       <section className="mt-5 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
//         <h2 className="text-lg font-semibold">Personal details</h2>
//         <dl className="mt-2 divide-y divide-[#EFEDE8] dark:divide-slate-800">
//           <Row label="Full name" value={student.name} />
//           <Row label="Email address" value={student.email} />
//           <Row
//             label="Phone number"
//             value={student.phone}
//             onAdd={openSettings}
//           />
//           <Row label="Course / program" value={student.course} />
//         </dl>
//       </section>

//       {/* Account */}
//       <section className="mt-5 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
//         <h2 className="text-lg font-semibold">Account</h2>
//         <dl className="mt-2 divide-y divide-[#EFEDE8] dark:divide-slate-800">
//           <Row
//             label="Student ID"
//             value={student.studentId}
//             action={
//               <button
//                 type="button"
//                 onClick={copyStudentId}
//                 aria-label="Copy student ID"
//                 className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] transition hover:bg-[#E6EEFF] dark:text-blue-300 dark:hover:bg-slate-800"
//               >
//                 <Icon
//                   name={copied ? "check" : "copy"}
//                   className="h-3.5 w-3.5"
//                 />
//                 {copied ? "Copied" : "Copy"}
//               </button>
//             }
//           />
//           <Row label="Registered" value={student.joinedDate} />
//           <Row
//             label="Status"
//             value={
//               <span className="rounded-full bg-[#DCE8FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300">
//                 Active
//               </span>
//             }
//           />
//         </dl>
//       </section>

//       {/* Delete account: quiet, at the bottom */}
//       <section className="mt-5 flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-slate-950">
//         <div>
//           <h2 className="text-lg font-semibold">Delete account</h2>
//           <p className="mt-1 max-w-md text-sm leading-6 text-[#718096] dark:text-slate-400">
//             This may affect your access to groups, materials and student
//             records, and can't be undone.
//           </p>
//         </div>
//         <button
//           type="button"
//           onClick={() => setConfirmDelete(true)}
//           className="w-fit shrink-0 rounded-full border border-[#E3B7B4] px-6 py-3 text-sm font-semibold text-[#B42318] transition hover:bg-[#FFF0F0] dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
//         >
//           Request deletion
//         </button>
//       </section>

//       {/* Deletion confirmation */}
//       {confirmDelete && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[#08152E]/50 p-4 backdrop-blur-sm"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) setConfirmDelete(false);
//           }}
//         >
//           <section
//             role="alertdialog"
//             aria-modal="true"
//             aria-labelledby="delete-account-title"
//             aria-describedby="delete-account-description"
//             className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl dark:bg-slate-950"
//           >
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0F0] text-[#B42318] dark:bg-red-950/50 dark:text-red-300">
//               <Icon name="alert" className="h-6 w-6" />
//             </div>
//             <h2
//               id="delete-account-title"
//               className="mt-4 text-xl font-semibold"
//             >
//               Delete your account?
//             </h2>
//             <p
//               id="delete-account-description"
//               className="mt-2 text-sm leading-6 text-[#718096] dark:text-slate-400"
//             >
//               Are you sure you want to request account deletion? Your access to
//               student groups and learning materials may be affected. Please make
//               sure you understand the consequences before proceeding.
//             </p>
//             <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 autoFocus
//                 onClick={() => setConfirmDelete(false)}
//                 className="rounded-full border border-[#E4E5E8] px-6 py-3 text-sm font-semibold transition hover:bg-[#F7F6F3] dark:border-slate-700 dark:hover:bg-slate-900"
//               >
//                 Keep my account
//               </button>
//               <button
//                 type="button"
//                 onClick={confirmAccountDeletion}
//                 className="rounded-full bg-[#B42318] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#912018]"
//               >
//                 Confirm request
//               </button>
//             </div>
//           </section>
//         </div>
//       )}

//       {/* Edit profile modal */}
//       {editing && (
//         <div
//           className="fixed inset-0 z-50 flex items-end justify-center bg-[#08152E]/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) setEditing(false);
//           }}
//         >
//           <section
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="profile-settings-title"
//             className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[90vh] sm:rounded-[28px] sm:p-8 dark:bg-slate-950"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2
//                   id="profile-settings-title"
//                   className="text-2xl font-semibold tracking-tight"
//                 >
//                   Edit profile
//                 </h2>
//                 <p className="mt-1 text-sm text-[#718096] dark:text-slate-400">
//                   Keep your details up to date.
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setEditing(false)}
//                 aria-label="Close settings"
//                 className="flex h-10 w-10 items-center justify-center rounded-full text-[#59677F] transition hover:bg-[#F1EFEA] dark:hover:bg-slate-800"
//               >
//                 <Icon name="close" className="h-5 w-5" />
//               </button>
//             </div>

//             <form
//               onSubmit={saveProfile}
//               className="mt-6 min-h-0 space-y-4 overflow-y-auto overscroll-contain pr-1"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#BFE6FF] text-lg font-semibold text-[#0D2B61] dark:bg-slate-800 dark:text-blue-300">
//                   {draft.photo ? (
//                     <img
//                       src={draft.photo}
//                       alt=""
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     draft.name.trim().charAt(0).toUpperCase() || "S"
//                   )}
//                 </div>
//                 <div>
//                   <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E6EEFF] px-4 py-2 text-sm font-semibold text-[#173D7A] transition hover:bg-[#D6E3FF]">
//                     <Icon name="camera" className="h-4 w-4" />
//                     Upload photo
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handlePhoto}
//                       className="sr-only"
//                     />
//                   </label>
//                   {draft.photo && (
//                     <button
//                       type="button"
//                       onClick={() => updateDraft("photo", "")}
//                       className="ml-3 text-sm font-medium text-[#B42318] hover:underline"
//                     >
//                       Remove
//                     </button>
//                   )}
//                   <p className="mt-1.5 text-xs text-[#718096]">
//                     JPG or PNG, up to 5 MB.
//                   </p>
//                 </div>
//               </div>

//               <Field label="Full name">
//                 <input
//                   required
//                   value={draft.name}
//                   onChange={(e) => updateDraft("name", e.target.value)}
//                   className={inputClass}
//                   autoComplete="name"
//                 />
//               </Field>

//               <Field label="Email address">
//                 <input
//                   type="email"
//                   required
//                   value={draft.email}
//                   onChange={(e) => updateDraft("email", e.target.value)}
//                   className={inputClass}
//                   autoComplete="email"
//                 />
//               </Field>

//               <Field label="Phone number">
//                 <input
//                   type="tel"
//                   placeholder="+91 98765 43210"
//                   value={draft.phone}
//                   onChange={(e) => updateDraft("phone", e.target.value)}
//                   className={inputClass}
//                   autoComplete="tel"
//                 />
//               </Field>

//               <Field label="Course / program">
//                 <input
//                   value={draft.course}
//                   onChange={(e) => updateDraft("course", e.target.value)}
//                   className={inputClass}
//                 />
//               </Field>

//               <p className="px-1 text-xs leading-5 text-[#718096] dark:text-slate-400">
//                 Student ID and registration date can't be edited here.
//               </p>

//               <div className="sticky bottom-0 flex shrink-0 gap-3 bg-white pt-3 pb-1 dark:bg-slate-950">
//                 <button
//                   type="button"
//                   onClick={() => setEditing(false)}
//                   className="flex-1 rounded-full border border-[#E4E5E8] px-4 py-3.5 text-sm font-semibold transition hover:bg-[#F7F6F3] dark:border-slate-700 dark:hover:bg-slate-900"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 rounded-full bg-[#0F3175] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0A2557]"
//                 >
//                   Save changes
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }

// function Row({ label, value, onAdd, action }) {
//   return (
//     <div className="flex items-center justify-between gap-4 py-4">
//       <dt className="shrink-0 text-sm text-[#718096] dark:text-slate-400">
//         {label}
//       </dt>
//       <dd className="flex min-w-0 items-center gap-3 text-right text-[15px] font-medium text-[#101B35] dark:text-slate-100">
//         {value ? (
//           <span className="min-w-0 break-words">{value}</span>
//         ) : (
//           <button
//             type="button"
//             onClick={onAdd}
//             className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-[#1D4ED8] transition hover:bg-[#E6EEFF] dark:text-blue-300 dark:hover:bg-slate-800"
//           >
//             <Icon name="plus" className="h-3.5 w-3.5" />
//             Add
//           </button>
//         )}
//         {action}
//       </dd>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <label className="block">
//       <span className="mb-2 block px-1 text-sm font-medium">{label}</span>
//       {children}
//     </label>
//   );
// }

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_STUDENT = {
  name: "Alex Johnson",
  studentId: "TF-STU-2026-001",
  course: "Computer Applications",
  email: "alex@example.com",
  phone: "",
  joinedDate: "October 2026",
  photo: "",
};

const inputClass =
  "w-full rounded-full border border-[#E4E5E8] bg-[#F7F6F3] px-5 py-3 text-sm text-[#101B35] outline-none transition placeholder:text-[#A3ACBA] focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2H15v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4L19 9l-4-4L4 16z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V6a2 2 0 0 1 2-2h9" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    alert: (
      <>
        <path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 16h.01" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function StudentProfile() {
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [draft, setDraft] = useState(INITIAL_STUDENT);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 6000);
    return () => clearTimeout(t);
  }, [message]);

  useEffect(() => {
    if (!editing && !confirmDelete) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setEditing(false);
        setConfirmDelete(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, confirmDelete]);

  const openSettings = () => {
    setDraft({ ...student });
    setMessage(null);
    setEditing(true);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setStudent({ ...draft });
    setEditing(false);
    setMessage({
      type: "success",
      text: "Profile changes saved for this session.",
    });
  };

  const updateDraft = (field, value) =>
    setDraft((previous) => ({ ...previous, [field]: value }));

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Choose an image smaller than 5 MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateDraft("photo", String(reader.result));
    reader.readAsDataURL(file);
  };

  const copyStudentId = async () => {
    try {
      await navigator.clipboard.writeText(student.studentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setMessage({
        type: "error",
        text: "Couldn't copy. Please copy it manually.",
      });
    }
  };

  // UI confirmation only. Actual account deletion needs backend support.
  const confirmAccountDeletion = () => {
    setConfirmDelete(false);
    setMessage({
      type: "info",
      text: "Account deletion is not connected yet. Please contact Thinkfotech support to delete your account.",
    });
  };

  const initials =
    student.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "S";

  return (
    <div className="mx-auto max-w-4xl text-[#101B35] dark:text-white">
      {/* Page heading, same pattern as the rest of the dashboard */}
      {/* <header>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Profile</h1>
        <p className="mt-2 text-base text-[#718096] dark:text-slate-400">
          Manage your personal details and account.
        </p>
      </header> */}

      {message && (
        <div
          role="status"
          className={`mt-6 flex items-start justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : message.type === "error"
                ? "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200"
                : "bg-[#E6EEFF] text-[#173D7A] dark:bg-slate-800 dark:text-blue-200"
          }`}
        >
          <span>{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            aria-label="Dismiss message"
            className="shrink-0 opacity-70 hover:opacity-100"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Identity card — no background banner */}
      <section className="mt-8 rounded-[28px] bg-white p-5 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[26px] border-4 border-white bg-[#EAF1FF] text-3xl font-semibold text-[#17448F] shadow-[0_4px_12px_rgba(16,27,53,0.12)] sm:h-[120px] sm:w-[120px] sm:text-4xl dark:border-slate-800 dark:bg-slate-800 dark:text-blue-300">
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={`${student.name}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <button
              type="button"
              onClick={openSettings}
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#153A80] text-white transition hover:bg-[#0D2B61] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 dark:border-slate-950"
            >
              <Icon name="camera" className="h-[17px] w-[17px]" />
            </button>
          </div>

          <div className="flex min-w-0 flex-1 items-start justify-between gap-2 pb-1 sm:items-end sm:pb-2">
            <div className="min-w-0">
              <h2 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
                {student.name}
              </h2>
              <p className="mt-1 truncate text-sm text-[#718096] dark:text-slate-400 sm:text-[15px]">
                {student.email}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {/* <span className="rounded-full bg-[#DCE8FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300">
                    Active
                  </span> */}
                {/* <span className="rounded-full bg-[#F1EFEA] px-3 py-1 text-xs font-semibold text-[#59677F] dark:bg-slate-800 dark:text-slate-300">
                    Student
                  </span> */}
              </div>
            </div>

            {/* Mobile: settings icon beside the name. Desktop: Edit profile button. */}
            <button
              type="button"
              onClick={openSettings}
              aria-label="Profile settings"
              title="Profile settings"
              className="-mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8DDE6] bg-white text-[#153A80] transition hover:bg-[#EAF1FF] sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300"
            >
              <Settings />
            </button>
          </div>

          <button
            type="button"
            onClick={openSettings}
            className="hidden w-fit shrink-0 items-center gap-2 rounded-full bg-[#0F3175] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#0A2557] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:inline-flex"
          >
            <Icon name="edit" className="h-[18px] w-[18px]" />
            Edit profile
          </button>
        </div>
      </section>

      {/* Personal details */}
      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
        <h2 className="text-lg font-semibold">Personal details</h2>
        <dl className="mt-2 divide-y divide-[#EFEDE8] dark:divide-slate-800">
          <Row label="Full name" value={student.name} />
          <Row label="Email address" value={student.email} />
          <Row
            label="Phone number"
            value={student.phone}
            onAdd={openSettings}
          />
          <Row label="Course / program" value={student.course} />
        </dl>
      </section>

      {/* Account */}
      <section className="mt-5 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:p-8 dark:bg-slate-950">
        <h2 className="text-lg font-semibold">Account</h2>
        <dl className="mt-2 divide-y divide-[#EFEDE8] dark:divide-slate-800">
          <Row
            label="Student ID"
            value={student.studentId}
            action={
              <button
                type="button"
                onClick={copyStudentId}
                aria-label="Copy student ID"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] transition hover:bg-[#E6EEFF] dark:text-blue-300 dark:hover:bg-slate-800"
              >
                <Icon
                  name={copied ? "check" : "copy"}
                  className="h-3.5 w-3.5"
                />
                {copied ? "Copied" : "Copy"}
              </button>
            }
          />
          <Row label="Registered" value={student.joinedDate} />
          <Row
            label="Status"
            value={
              <span className="rounded-full bg-[#DCE8FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300">
                Active
              </span>
            }
          />
        </dl>
      </section>

      {/* Delete account: quiet, at the bottom */}
      <section className="mt-5 flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(16,27,53,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-slate-950">
        <div>
          <h2 className="text-lg font-semibold">Delete account</h2>
          <p className="mt-1 max-w-md text-sm leading-6 text-[#718096] dark:text-slate-400">
            This may affect your access to groups, materials and student
            records, and can't be undone.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="w-fit shrink-0 rounded-full border border-[#E3B7B4] px-6 py-3 text-sm font-semibold text-[#B42318] transition hover:bg-[#FFF0F0] dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
        >
          Request deletion
        </button>
      </section>

      {/* Deletion confirmation */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#08152E]/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmDelete(false);
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            aria-describedby="delete-account-description"
            className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl dark:bg-slate-950"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0F0] text-[#B42318] dark:bg-red-950/50 dark:text-red-300">
              <Icon name="alert" className="h-6 w-6" />
            </div>
            <h2
              id="delete-account-title"
              className="mt-4 text-xl font-semibold"
            >
              Delete your account?
            </h2>
            <p
              id="delete-account-description"
              className="mt-2 text-sm leading-6 text-[#718096] dark:text-slate-400"
            >
              Are you sure you want to request account deletion? Your access to
              student groups and learning materials may be affected. Please make
              sure you understand the consequences before proceeding.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmDelete(false)}
                className="rounded-full border border-[#E4E5E8] px-6 py-3 text-sm font-semibold transition hover:bg-[#F7F6F3] dark:border-slate-700 dark:hover:bg-slate-900"
              >
                Keep my account
              </button>
              <button
                type="button"
                onClick={confirmAccountDeletion}
                className="rounded-full bg-[#B42318] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#912018]"
              >
                Confirm request
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Edit profile modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#08152E]/50 p-3 backdrop-blur-sm sm:p-4 md:mb-0 mb-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditing(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-settings-title"
            className="my-auto flex h-[min(90dvh,760px)] w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-white p-5 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:h-auto sm:max-h-[min(90vh,760px)] sm:p-8 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="profile-settings-title"
                  className="text-2xl font-semibold tracking-tight"
                >
                  Edit profile
                </h2>
                <p className="mt-1 text-sm text-[#718096] dark:text-slate-400">
                  Keep your details up to date.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(false)}
                aria-label="Close settings"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#59677F] transition hover:bg-[#F1EFEA] dark:hover:bg-slate-800"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={saveProfile}
              className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden sm:mt-6"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain pr-1 pb-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#BFE6FF] text-lg font-semibold text-[#0D2B61] dark:bg-slate-800 dark:text-blue-300">
                  {draft.photo ? (
                    <img
                      src={draft.photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    draft.name.trim().charAt(0).toUpperCase() || "S"
                  )}
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E6EEFF] px-4 py-2 text-sm font-semibold text-[#173D7A] transition hover:bg-[#D6E3FF]">
                    <Icon name="camera" className="h-4 w-4" />
                    Upload photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="sr-only"
                    />
                  </label>
                  {draft.photo && (
                    <button
                      type="button"
                      onClick={() => updateDraft("photo", "")}
                      className="ml-3 text-sm font-medium text-[#B42318] hover:underline"
                    >
                      Remove
                    </button>
                  )}
                  <p className="mt-1.5 text-xs text-[#718096]">
                    JPG or PNG, up to 5 MB.
                  </p>
                </div>
              </div>

              <Field label="Full name">
                <input
                  required
                  value={draft.name}
                  onChange={(e) => updateDraft("name", e.target.value)}
                  className={inputClass}
                  autoComplete="name"
                />
              </Field>

              <Field label="Email address">
                <input
                  type="email"
                  required
                  value={draft.email}
                  onChange={(e) => updateDraft("email", e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>

              <Field label="Phone number">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={draft.phone}
                  onChange={(e) => updateDraft("phone", e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </Field>

              <Field label="Course / program">
                <input
                  value={draft.course}
                  onChange={(e) => updateDraft("course", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <p className="px-1 text-xs leading-5 text-[#718096] dark:text-slate-400">
                Student ID and registration date can't be edited here.
              </p>

              </div>

              <div className="flex shrink-0 gap-3 border-t border-[#EFEDE8] bg-white pt-4 pb-1 dark:border-slate-800 dark:bg-slate-950">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 rounded-full border border-[#E4E5E8] px-4 py-3.5 text-sm font-semibold transition hover:bg-[#F7F6F3] dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#0F3175] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0A2557]"
                >
                  Save changes
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, onAdd, action }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <dt className="shrink-0 text-sm text-[#718096] dark:text-slate-400">
        {label}
      </dt>
      <dd className="flex min-w-0 items-center gap-3 text-right text-[15px] font-medium text-[#101B35] dark:text-slate-100">
        {value ? (
          <span className="min-w-0 break-words">{value}</span>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-[#1D4ED8] transition hover:bg-[#E6EEFF] dark:text-blue-300 dark:hover:bg-slate-800"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            Add
          </button>
        )}
        {action}
      </dd>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-5 block px-1 text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}




