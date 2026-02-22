"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { isValidEmail, normalizeEmail } from "@/lib/waitlist";

type SubmissionState =
  | { status: "idle"; primary: ""; secondary: "" }
  | { status: "loading"; primary: ""; secondary: "" }
  | { status: "success"; primary: string; secondary: string }
  | { status: "error"; primary: string; secondary: string };

const DEFAULT_MESSAGES = {
  successPrimary: "the penguin will contact you shortly",
  successSecondary: "the penguin values your inbox and avoids unnecessary messages",
  duplicatePrimary: "duplicate email detected",
  duplicateSecondary: "the penguin recommends an amnesia consultation",
  invalidPrimary: "the penguin can't parse this email format",
  invalidSecondary: "use a format like name@domain.com",
  fallbackPrimary: "the penguin hit turbulence while processing your request",
  fallbackSecondary: "please try again in a moment",
};

type WaitlistApiResponse = {
  message?: string;
};

type WaitlistFormProps = {
  formClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  messageClassName?: string;
  buttonLabel?: string;
  inputPlaceholder?: string;
  messages?: Partial<typeof DEFAULT_MESSAGES>;
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function WaitlistForm({
  formClassName,
  inputContainerClassName,
  inputClassName,
  buttonClassName,
  messageClassName,
  buttonLabel = "Join waitlist",
  inputPlaceholder = "you@example.com",
  messages,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    primary: "",
    secondary: "",
  });
  const [typedPrimary, setTypedPrimary] = useState("");
  const [typedSecondary, setTypedSecondary] = useState("");
  const resolvedMessages = { ...DEFAULT_MESSAGES, ...messages };

  const isLoading = submissionState.status === "loading";
  const isDisabled = isLoading || email.trim().length === 0;

  const feedbackClassName = useMemo(() => {
    if (submissionState.status === "success") {
      return "text-[#14613a]";
    }
    if (submissionState.status === "error") {
      return "text-[#a42603]";
    }
    return "text-transparent opacity-0";
  }, [submissionState.status]);

  useEffect(() => {
    const shouldType =
      submissionState.status === "success" || submissionState.status === "error";

    if (!shouldType) {
      return;
    }

    const intervals = new Set<ReturnType<typeof setInterval>>();
    const timeouts = new Set<ReturnType<typeof setTimeout>>();

    const typeLine = (
      line: string,
      setter: (value: string) => void,
      speedMs: number,
      onComplete?: () => void,
    ) => {
      setter("");
      let index = 0;
      const intervalId = setInterval(() => {
        index += 1;
        setter(line.slice(0, index));
        if (index >= line.length) {
          clearInterval(intervalId);
          intervals.delete(intervalId);
          onComplete?.();
        }
      }, speedMs);
      intervals.add(intervalId);
    };

    typeLine(submissionState.primary, setTypedPrimary, 28, () => {
      if (!submissionState.secondary) {
        return;
      }
      const timeoutId = setTimeout(() => {
        typeLine(submissionState.secondary, setTypedSecondary, 24);
      }, 1200);
      timeouts.add(timeoutId);
    });

    return () => {
      for (const intervalId of intervals) {
        clearInterval(intervalId);
      }
      for (const timeoutId of timeouts) {
        clearTimeout(timeoutId);
      }
    };
  }, [submissionState]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTypedPrimary("");
    setTypedSecondary("");

    const normalizedEmail = normalizeEmail(email);
    if (!isValidEmail(normalizedEmail)) {
      setSubmissionState({
        status: "error",
        primary: resolvedMessages.invalidPrimary,
        secondary: resolvedMessages.invalidSecondary,
      });
      return;
    }

    setSubmissionState({ status: "loading", primary: "", secondary: "" });

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
          primary: resolvedMessages.successPrimary,
          secondary: resolvedMessages.successSecondary,
        });
        return;
      }

      if (response.status === 409) {
        setSubmissionState({
          status: "error",
          primary: resolvedMessages.duplicatePrimary,
          secondary: resolvedMessages.duplicateSecondary,
        });
        return;
      }

      if (response.status === 400) {
        setSubmissionState({
          status: "error",
          primary: resolvedMessages.invalidPrimary,
          secondary: resolvedMessages.invalidSecondary,
        });
        return;
      }

      if (response.status === 429 || response.status === 503) {
        setSubmissionState({
          status: "error",
          primary: apiMessage || resolvedMessages.fallbackPrimary,
          secondary: resolvedMessages.fallbackSecondary,
        });
        return;
      }

      setSubmissionState({
        status: "error",
        primary: apiMessage || resolvedMessages.fallbackPrimary,
        secondary: resolvedMessages.fallbackSecondary,
      });
    } catch {
      setSubmissionState({
        status: "error",
        primary: resolvedMessages.fallbackPrimary,
        secondary: resolvedMessages.fallbackSecondary,
      });
    }
  }

  return (
    <form className={joinClasses("space-y-3", formClassName)} onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="waitlist-email">
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className={joinClasses("w-full", inputContainerClassName)}>
          <input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={inputPlaceholder}
            className={joinClasses(
              "h-12 w-full rounded-xl border border-[#22222a]/15 bg-white px-4 text-base text-[#22222a] outline-none transition focus:border-[#d2673b] focus:ring-2 focus:ring-[#d2673b]/25",
              inputClassName,
            )}
            aria-invalid={submissionState.status === "error"}
            required
            maxLength={254}
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className={joinClasses(
            "h-12 shrink-0 rounded-xl bg-[#22222a] px-5 text-sm font-semibold text-[#f2f3f4] transition hover:bg-[#1b1b22] disabled:cursor-not-allowed disabled:opacity-60",
            buttonClassName,
          )}
        >
          {isLoading ? "Joining..." : buttonLabel}
        </button>
      </div>
      <div
        aria-live="polite"
        className={joinClasses(
          "min-h-[3.1rem] text-sm font-medium",
          feedbackClassName,
          messageClassName,
        )}
      >
        {submissionState.status === "success" || submissionState.status === "error" ? (
          <>
            <p className="min-h-[1.4em] whitespace-nowrap">
              {typedPrimary}
              {typedPrimary.length < submissionState.primary.length ? (
                <span aria-hidden className="typing-caret">
                  |
                </span>
              ) : null}
            </p>
            <p className="min-h-[1.4em] whitespace-nowrap text-[0.9em] opacity-90">
              {typedSecondary}
              {typedSecondary.length < submissionState.secondary.length &&
              typedPrimary.length >= submissionState.primary.length ? (
                <span aria-hidden className="typing-caret">
                  |
                </span>
              ) : null}
            </p>
          </>
        ) : (
          <span className="opacity-0">.</span>
        )}
      </div>
    </form>
  );
}
