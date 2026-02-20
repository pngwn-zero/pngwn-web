"use client";

import { FormEvent, useMemo, useState } from "react";
import { isValidEmail, normalizeEmail } from "@/lib/waitlist";

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const SUCCESS_MESSAGE = "You’re in. Welcome to pngwn.";
const DUPLICATE_MESSAGE = "You’re already on the list.";
const INVALID_MESSAGE = "Enter a valid email.";
const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

type WaitlistApiResponse = {
  message?: string;
};

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  const isLoading = submissionState.status === "loading";
  const isDisabled = isLoading || email.trim().length === 0;

  const feedbackClassName = useMemo(() => {
    if (submissionState.status === "success") {
      return "text-[#14613a]";
    }
    if (submissionState.status === "error") {
      return "text-[#a42603]";
    }
    return "text-transparent";
  }, [submissionState.status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(email);
    if (!isValidEmail(normalizedEmail)) {
      setSubmissionState({ status: "error", message: INVALID_MESSAGE });
      return;
    }

    setSubmissionState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source: "website",
        }),
      });
      let apiMessage = "";
      try {
        const data = (await response.json()) as WaitlistApiResponse;
        apiMessage = typeof data.message === "string" ? data.message : "";
      } catch {
        apiMessage = "";
      }

      if (response.status === 200) {
        setEmail("");
        setSubmissionState({
          status: "success",
          message: apiMessage || SUCCESS_MESSAGE,
        });
        return;
      }

      if (response.status === 409) {
        setSubmissionState({
          status: "error",
          message: apiMessage || DUPLICATE_MESSAGE,
        });
        return;
      }

      if (response.status === 400) {
        setSubmissionState({
          status: "error",
          message: apiMessage || INVALID_MESSAGE,
        });
        return;
      }

      if (response.status === 429 || response.status === 503) {
        setSubmissionState({
          status: "error",
          message: apiMessage || FALLBACK_ERROR_MESSAGE,
        });
        return;
      }

      setSubmissionState({
        status: "error",
        message: apiMessage || FALLBACK_ERROR_MESSAGE,
      });
    } catch {
      setSubmissionState({
        status: "error",
        message: FALLBACK_ERROR_MESSAGE,
      });
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="waitlist-email">
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-[#22222a]/15 bg-white px-4 text-base text-[#22222a] outline-none transition focus:border-[#d2673b] focus:ring-2 focus:ring-[#d2673b]/25"
          aria-invalid={submissionState.status === "error"}
          required
          maxLength={254}
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="h-12 shrink-0 rounded-xl bg-[#22222a] px-5 text-sm font-semibold text-[#f2f3f4] transition hover:bg-[#1b1b22] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Joining..." : "Join waitlist"}
        </button>
      </div>
      <p aria-live="polite" className={`min-h-6 text-sm font-medium ${feedbackClassName}`}>
        {submissionState.message || "."}
      </p>
    </form>
  );
}
