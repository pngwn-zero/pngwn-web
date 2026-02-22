type HeroProps = {
  line1Prefix: string;
  highlight: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  attribution: string;
};

export function Hero({
  line1Prefix,
  highlight,
  line2,
  line3,
  line4,
  line5,
  attribution,
}: HeroProps) {
  return (
    <section
      id="about"
      className="relative z-30 mt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:h-[1024px]"
    >
      <blockquote className="mx-auto max-w-[680px] text-center lg:absolute lg:right-[38px] lg:top-[214px] lg:mx-0 lg:w-[352px]">
        <p className="font-brand text-[29px] font-medium leading-[1.15] text-[#fcf5f3] sm:text-[36px] lg:text-[36px] lg:leading-[53px]">
          {line1Prefix} <span className="font-bold text-[#d89940]">{highlight}</span>
          <br />
          {line2}
          <br />
          {line3}
          <br />
          {line4}
          <br />
          {line5}
        </p>
        <p className="mt-2 font-brand text-[16px] font-medium leading-[1.2] text-[#fcf5f3] sm:text-[18px] lg:mt-1 lg:text-[16px] lg:leading-[39px]">
          {attribution}
        </p>
      </blockquote>
    </section>
  );
}
