"use client";

import Image from "next/image";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LANDING_COPY, LanguageCode, isLanguageCode } from "@/lib/i18n";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Waitlist } from "./Waitlist";

const LANGUAGE_STORAGE_KEY = "pngwn-language";

export function LandingPageClient() {
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
    <div className="min-h-screen bg-[#141414]">
      <main className="relative mx-auto min-h-screen w-full max-w-[1536px] overflow-x-hidden px-5 pb-10 pt-5 lg:h-screen lg:overflow-hidden lg:px-0 lg:pb-0 lg:pt-0">
        <div className="absolute left-3 top-3 z-[95] lg:left-[24px] lg:top-[18px]">
          <LanguageSwitcher
            value={language}
            onChange={handleLanguageChange}
            label={copy.languageLabel}
          />
        </div>

        <Image
          src="/penguin-silhouette-hero.png"
          alt="Penguin silhouette"
          width={1360}
          height={907}
          priority
          className="pointer-events-none relative mx-auto mt-10 hidden h-auto w-[min(92vw,760px)] lg:absolute lg:left-1/2 lg:top-[-40px] lg:block lg:w-[1360px] lg:-translate-x-1/2"
        />

        <Header contactLabel={copy.nav.contact} aboutLabel={copy.nav.about} />
        <Hero
          line1Prefix={copy.quote.line1Prefix}
          highlight={copy.quote.highlight}
          line2={copy.quote.line2}
          line3={copy.quote.line3}
          line4={copy.quote.line4}
          line5={copy.quote.line5}
          attribution={copy.quote.attribution}
        />
        <Waitlist
          title={copy.waitlist.title}
          subtitle={copy.waitlist.subtitle}
          inputPlaceholder={copy.waitlist.placeholder}
          buttonLabel={copy.waitlist.button}
          messages={copy.waitlist.messages}
        />
        <Features
          headingPink={copy.why.pink}
          headingRest={copy.why.rest}
          bulletOne={copy.bullets.one}
          bulletTwo={copy.bullets.two}
          bulletThree={copy.bullets.three}
          freeTitle1={copy.free.title1}
          freeTitle2={copy.free.title2}
          freeHeadline={copy.free.headline}
          freeNoCatch={copy.free.noCatch}
          freeVisitPrefix={copy.free.visitPrefix}
          freeVisitLink={copy.free.visitLink}
          freeVisitSuffix={copy.free.visitSuffix}
        />

        <Image
          src="/penguin-silhouette-hero.png"
          alt="Penguin silhouette"
          width={1360}
          height={907}
          className="pointer-events-none relative z-10 mx-auto mt-10 block h-auto w-[min(92vw,760px)] lg:hidden"
        />

        <Footer
          chatPrompt={copy.footer.chatPrompt}
          email={copy.footer.email}
          siteText={copy.footer.siteText}
          yearText={copy.footer.yearText}
        />
      </main>
    </div>
  );
}
