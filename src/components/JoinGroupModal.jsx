


import { useState } from "react";
import {
  KeyRound,
  X,
  ArrowRight,
  Users,
  CheckCircle2,
  SearchCheck,
} from "lucide-react";

export default function JoinGroupModal({
  isOpen,
  onClose,
  onJoin,
  findGroupByCode,
}) {
  const [accessCode, setAccessCode] = useState("");
  const [previewGroup, setPreviewGroup] = useState(null);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  if (!isOpen) return null;

  const handleCheckCode = async (event) => {
    event.preventDefault();

    const code = accessCode.trim();

    if (!code) {
      setError("Please enter an access code.");
      setPreviewGroup(null);
      return;
    }

    setError("");
    setPreviewGroup(null);
    setIsChecking(true);

    try {
      const group = await findGroupByCode?.(code);

      if (!group) {
        setError("No group found for this access code.");
        return;
      }

      setPreviewGroup(group);
    } catch {
      setError("Unable to check this code. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleClose = () => {
    setAccessCode("");
    setPreviewGroup(null);
    setError("");
    setIsChecking(false);
    onClose?.();
  };

  const handleJoin = () => {
    if (!previewGroup) return;
    onJoin?.(previewGroup);
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-group-title"
        className="relative my-auto max-h-[calc(100dvh-24px)] w-full max-w-xl overflow-y-auto rounded-[28px] border border-white/80 bg-[#fffefd] p-5 shadow-2xl sm:max-h-[90vh] sm:rounded-[30px] sm:p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-blue-600 text-blue-600 sm:h-[54px] sm:w-[54px] sm:border-[3px]">
              <KeyRound size={23} strokeWidth={1.9} />
            </div>

            <div className="min-w-0">
              <h2
                id="join-group-title"
                className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
              >
                Join code
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500 sm:text-base sm:leading-6">
                Enter the code shared by your staff member
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 sm:h-10 sm:w-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Access code form */}
        <form onSubmit={handleCheckCode} className="mt-6 sm:mt-7">
          <label htmlFor="group-access-code" className="sr-only">
            Group access code
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              id="group-access-code"
              type="text"
              value={accessCode}
              onChange={(event) => {
                setAccessCode(event.target.value);
                setPreviewGroup(null);
                setError("");
              }}
              placeholder="Type or enter a code"
              autoComplete="off"
              autoFocus
              className="h-[54px] w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-base tracking-wide text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 sm:h-[58px] sm:flex-1 sm:px-5"
            />

            <button
              type="submit"
              disabled={isChecking}
              className="inline-flex h-[54px] mt-3 md:mt-0 w-full shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[#102a56] px-6 text-base font-semibold text-[#102a56] transition hover:bg-[#102a56] hover:text-white disabled:cursor-wait disabled:opacity-60 sm:h-[58px] sm:w-auto"
            >
              <SearchCheck size={18} strokeWidth={1.8} />
              {isChecking ? "Checking..." : "Check code"}
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </form>

        {/* Group preview */}
        {previewGroup && (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-blue-600">
                <Users size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Group found
                </p>

                <h3 className="mt-1 break-words text-lg font-semibold text-slate-900">
                  {previewGroup.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {previewGroup.type || "Program"}
                </p>
              </div>

              <CheckCircle2
                size={22}
                className="shrink-0 text-emerald-600"
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {previewGroup.description ||
                "No group description is available yet."}
            </p>

            <button
              type="button"
              onClick={handleJoin}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-5 font-semibold text-white transition hover:bg-blue-800"
            >
              Confirm and join
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex justify-center border-t border-slate-100 pt-4 sm:mt-6">
          <p className="text-center text-xs leading-5 text-slate-400 sm:text-sm">
            Need a code? Contact your staff member.
          </p>
        </div>
      </section>
    </div>
  );
}
