import { WaitlistForm } from "@/components/waitlist-form";

type WaitlistProps = {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  buttonLabel: string;
  messages: {
    successPrimary: string;
    successSecondary: string;
    duplicatePrimary: string;
    duplicateSecondary: string;
    invalidPrimary: string;
    invalidSecondary: string;
    fallbackPrimary: string;
    fallbackSecondary: string;
  };
};

export function Waitlist({ title, subtitle, inputPlaceholder, buttonLabel, messages }: WaitlistProps) {
  return (
    <section
      id="waitlist"
      className="relative z-[70] mt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:h-[1024px]"
    >
      <div className="pointer-events-auto mx-auto max-w-[620px] text-center text-[#141414] lg:absolute lg:left-1/2 lg:top-[458px] lg:w-[484px] lg:-translate-x-1/2">
        <h2 className="font-brand text-[28px] font-semibold leading-[31px]">{title}</h2>
        <p className="mt-[8px] font-brand text-[17px] font-medium leading-[24px]">{subtitle}</p>

        <div className="mx-auto mt-[8px] w-full max-w-[420px] lg:max-w-[300px]">
          <WaitlistForm
            formClassName="space-y-2"
            inputContainerClassName="waitlist-glass-shell"
            inputClassName="h-[38px] rounded-full border border-white/25 bg-white/28 px-5 text-center font-brand text-[20px] text-[#666666] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] backdrop-blur-md placeholder:text-[#666666] focus:border-[#d2673b]"
            buttonClassName="mx-auto h-[42px] rounded-full bg-[#141414] px-8 font-brand text-[20px] font-medium text-[#fcf5f3] hover:bg-[#232323] lg:hidden"
            messageClassName="text-center text-[11px] leading-[1.15] md:text-xs lg:text-[11px]"
            buttonLabel={buttonLabel}
            inputPlaceholder={inputPlaceholder}
            messages={messages}
          />
        </div>
      </div>
    </section>
  );
}
