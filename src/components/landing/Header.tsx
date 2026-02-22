const LOGO_LETTERS = [
  { char: "p", color: "#d2673b" },
  { char: "n", color: "#e49cc2" },
  { char: "g", color: "#d89940" },
  { char: "w", color: "#fcf5f3" },
  { char: "n", color: "#d2673b" },
];

type HeaderProps = {
  contactLabel: string;
  aboutLabel: string;
};

export function Header({ contactLabel, aboutLabel }: HeaderProps) {
  return (
    <header className="relative z-60 lg:absolute lg:inset-x-0 lg:top-0 lg:h-[245px]">
      <nav className="absolute right-0 top-0 flex items-center gap-6 text-[20px] font-medium leading-[1] text-[#fcf5f3] lg:right-[28px] lg:top-[16px] lg:gap-[18px] lg:text-[27px] lg:leading-[24px]">
        <a className="font-brand underline underline-offset-8" href="/contact">
          {contactLabel}
        </a>
        <a className="font-brand underline underline-offset-8" href="/about">
          {aboutLabel}
        </a>
      </nav>

      <p
        className="mt-10 text-center text-[82px] font-normal leading-[0.9] lg:absolute lg:left-1/2 lg:top-[10px] lg:mt-0 lg:-translate-x-1/2 lg:text-[110px] lg:leading-[170px]"
        style={{ fontFamily: "Baloo, 'Baloo 2', sans-serif", fontWeight: 400 }}
      >
        {LOGO_LETTERS.map((letter, index) => (
          <span key={`${letter.char}-${index}`} style={{ color: letter.color }}>
            {letter.char}
          </span>
        ))}
      </p>
    </header>
  );
}
