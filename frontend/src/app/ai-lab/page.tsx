import { ArrowRight, BrainCircuit } from "lucide-react";
import { aiStudio } from "@/lib/product";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AiLabPage() {
  return (
    <main className="min-h-screen bg-mesh-light text-ink dark:bg-mesh-dark dark:text-white">
      <header className="border-b border-white/40 bg-white/70 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-night/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-ember">AI studio</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight">Generate roadmaps, interviews, flashcards, and feedback from one learner graph.</h1>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiStudio.map((tool) => (
            <article className="group rounded-3xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10" key={tool.title}>
              <div className="mb-8 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white dark:bg-white dark:text-night">
                  <tool.icon size={22} />
                </div>
                <ArrowRight className="transition group-hover:translate-x-1" size={20} />
              </div>
              <h2 className="text-xl font-black">{tool.title}</h2>
              <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-300">{tool.status}</p>
              <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600 dark:bg-night/45 dark:text-slate-300">
                <BrainCircuit className="mb-3 text-aurora" size={18} />
                API route: <span className="font-mono">POST /api/ai/{tool.title.toLowerCase().replaceAll(" ", "-")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
