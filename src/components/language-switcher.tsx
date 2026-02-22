"use client";

import { LANGUAGE_OPTIONS, LanguageCode } from "@/lib/i18n";

type LanguageSwitcherProps = {
  value: LanguageCode;
  onChange: (next: LanguageCode) => void;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ value, onChange, label, className }: LanguageSwitcherProps) {
  return (
    <label className={className}>
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as LanguageCode)}
        className="rounded-full border border-white/25 bg-[#141414]/70 px-3 py-1.5 font-brand text-sm font-medium text-[#fcf5f3] backdrop-blur-sm outline-none transition hover:border-white/45 focus:border-[#d97d59]"
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.flag} {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
