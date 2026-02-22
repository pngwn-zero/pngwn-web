import Image from "next/image";
import Link from "next/link";

const ICONS = {
  sun: "/sun-icon-landing-page.svg",
  wind: "/wind-icon-landing-page.svg",
  snow: "/snowflake-icon-landing-page.svg",
};

type FeaturesProps = {
  headingPink: string;
  headingRest: string;
  bulletOne: { title: string; highlight: string; subtitle: string };
  bulletTwo: { title: string; subtitlePrefix: string; subtitleHighlight: string };
  bulletThree: { title: string; highlight: string; subtitle: string };
  freeTitle1: string;
  freeTitle2: string;
  freeHeadline: string;
  freeNoCatch: string;
  freeVisitPrefix: string;
  freeVisitLink: string;
  freeVisitSuffix: string;
};

export function Features({
  headingPink,
  headingRest,
  bulletOne,
  bulletTwo,
  bulletThree,
  freeTitle1,
  freeTitle2,
  freeHeadline,
  freeNoCatch,
  freeVisitPrefix,
  freeVisitLink,
  freeVisitSuffix,
}: FeaturesProps) {
  return (
    <section
      className="relative z-30 mt-10 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:h-[1024px]"
      aria-labelledby="why-heading"
    >
      <h2
        id="why-heading"
        className="mb-6 text-[48px] font-normal leading-[0.95] text-[#fcf5f3] lg:absolute lg:left-[48px] lg:top-[154px] lg:mb-0 lg:text-[50px] lg:leading-[74px]"
        style={{ fontFamily: "Baloo, 'Baloo 2', sans-serif", fontWeight: 400 }}
      >
        <span style={{ color: "#e49cc2" }}>{headingPink}</span>
        {headingRest}
      </h2>

      <div className="space-y-4 lg:absolute lg:left-[14px] lg:top-[212px] lg:w-[452px] lg:space-y-[2px]">
        <article className="flex items-center gap-4 lg:gap-[7px]">
          <Image
            src={ICONS.sun}
            alt="Sun icon"
            width={80}
            height={80}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-20 lg:w-20"
          />
          <div className="font-brand text-[#fcf5f3] lg:-mt-0.5">
            <p className="text-[16px] font-bold leading-[21px]">
              {bulletOne.title} <span style={{ color: "#d2673b" }}>{bulletOne.highlight}</span>
            </p>
            <p className="text-[12px] font-medium leading-[19px]">{bulletOne.subtitle}</p>
          </div>
        </article>

        <article className="flex items-center gap-4 lg:gap-[7px]">
          <Image
            src={ICONS.wind}
            alt="Wind icon"
            width={80}
            height={80}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-20 lg:w-20"
          />
          <div className="font-brand text-[#fcf5f3] lg:-mt-0.5">
            <p className="text-[16px] font-bold leading-[21px]">{bulletTwo.title}</p>
            <p className="text-[12px] font-medium leading-[19px]">
              {bulletTwo.subtitlePrefix}{" "}
              <span className="font-bold text-[#d89940]">{bulletTwo.subtitleHighlight}</span>
            </p>
          </div>
        </article>

        <article className="flex items-center gap-4 lg:gap-[7px]">
          <Image
            src={ICONS.snow}
            alt="Snowflake icon"
            width={80}
            height={80}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-20 lg:w-20"
          />
          <div className="font-brand text-[#fcf5f3] lg:-mt-0.5">
            <p className="text-[16px] font-bold leading-[21px]">
              {bulletThree.title} <span style={{ color: "#cb3910" }}>{bulletThree.highlight}</span>
            </p>
            <p className="text-[12px] font-medium leading-[19px]">{bulletThree.subtitle}</p>
          </div>
        </article>
      </div>

      <aside className="mt-8 max-w-[420px] text-[#fcf5f3] lg:absolute lg:left-[12px] lg:top-[450px] lg:mt-0 lg:w-[332px]">
        <p
          className="text-[30px] font-normal leading-[26px]"
          style={{ fontFamily: "Baloo, 'Baloo 2', sans-serif", fontWeight: 400 }}
        >
          {freeTitle1}
          <br />
          {freeTitle2}
        </p>
        <p className="mt-3 font-brand text-[22px] font-bold leading-[24px]">{freeHeadline}</p>
        <p className="mt-2 font-brand text-[14px] font-medium leading-[20px]">{freeNoCatch}</p>
        <p className="mt-2 font-brand text-[14px] font-medium leading-[20px]">
          {freeVisitPrefix}{" "}
          <Link className="accent-orange font-extrabold" href="/how-we-make-money">
            {freeVisitLink}
          </Link>{" "}
          {freeVisitSuffix}
        </p>
      </aside>
    </section>
  );
}
