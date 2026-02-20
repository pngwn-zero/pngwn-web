import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#f2f3f4_60%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <header className="py-2">
          <p className="font-brand text-3xl font-semibold tracking-tight text-[#22222a]">
            pngwn
          </p>
        </header>

        <main className="flex flex-1 items-center py-8">
          <section className="w-full rounded-3xl border border-[#22222a]/10 bg-white/90 px-6 py-8 shadow-[0_20px_60px_-30px_rgba(34,34,42,0.35)] backdrop-blur md:px-10 md:py-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d2673b]">
              Waitlist
            </p>
            <h1 className="mt-4 max-w-2xl font-brand text-4xl leading-tight text-[#22222a] sm:text-5xl">
              Personalized weather omniscience.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#22222a]/80">
              What to wear, learned from you.
            </p>

            <div className="mt-8 max-w-xl">
              <WaitlistForm />
            </div>

            <ul className="mt-8 flex flex-col gap-2 text-sm font-semibold text-[#22222a]/85 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <li>No subscriptions.</li>
              <li>No selling your data.</li>
              <li>We only earn if you feel value.</li>
            </ul>
          </section>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm text-[#22222a]/70">
          <p>© {new Date().getFullYear()} pngwn</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-[#22222a]" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-[#22222a]" href="/terms">
              Terms
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
