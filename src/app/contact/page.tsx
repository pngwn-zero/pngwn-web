"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LANDING_COPY, LanguageCode, isLanguageCode } from "@/lib/i18n";

const LANGUAGE_STORAGE_KEY = "pngwn-language";

export default function ContactPage() {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return "en";
    }
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage && isLanguageCode(savedLanguage) ? savedLanguage : "en";
  });

  const copy = LANDING_COPY[language];

  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  return (
    <main className="min-h-screen bg-[#141414] px-6 py-6 text-[#fcf5f3]">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-10 flex items-center justify-between">
          <LanguageSwitcher
            value={language}
            onChange={handleLanguageChange}
            label={copy.languageLabel}
          />
          <Link className="font-brand text-xl underline underline-offset-8" href="/">
            {copy.pages.homeLink}
          </Link>
        </div>

        <h1 className="font-brand text-5xl font-semibold md:text-6xl">{copy.pages.contactTitle}</h1>
        <p className="mt-6 max-w-[700px] font-brand text-2xl font-medium leading-[1.35]">
          {copy.pages.contactBody}
        </p>
      </div>
    </main>
  );
}
