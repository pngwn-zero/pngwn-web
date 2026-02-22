import Image from "next/image";

type FooterProps = {
  chatPrompt: string;
  email: string;
  siteText: string;
  yearText: string;
};

export function Footer({ chatPrompt, email, siteText, yearText }: FooterProps) {
  return (
    <footer className="relative z-[75] mt-8 pb-4 lg:absolute lg:inset-x-0 lg:bottom-[12px] lg:mt-0 lg:h-[46px] lg:pb-0">
      <div className="relative h-full min-h-[120px] lg:min-h-0">
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center text-[#141414] lg:bottom-0">
          <div className="flex w-[136px] items-center justify-end gap-0.5">
            <Image
              src="/pngwn-logo-version1.svg"
              alt="pngwn logo mark"
              width={17}
              height={17}
              className="h-[17px] w-[17px]"
            />
            <a className="font-brand text-[17px] font-medium leading-[27px]" href="https://pngwn.org">
              {siteText}
            </a>
          </div>
          <p className="mx-1.5 font-brand text-[17px] font-medium leading-[27px]">©</p>
          <p className="w-[136px] text-left font-brand text-[17px] font-medium leading-[27px]">
            {yearText}
          </p>
        </div>

        <div
          id="contact"
          className="absolute right-0 top-0 flex items-center justify-end gap-2 lg:right-[26px] lg:top-auto lg:bottom-[2px] lg:gap-2"
        >
          <p className="font-brand text-[18px] font-bold leading-[20px] text-[#fcf5f3]">{chatPrompt}</p>
          <a
            className="accent-orange font-brand text-[18px] font-normal leading-[20px]"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
