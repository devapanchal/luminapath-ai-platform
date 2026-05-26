"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, CheckCircle2, PlayCircle, Search } from "lucide-react";
import { aiStudio, courses, differentiators, identity, navItems, roleCards } from "@/lib/product";
import { LearningRhythmChart, SkillHeatmapChart } from "./Charts";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function AppFrame() {
  return (
    <main className="min-h-screen bg-mesh-light text-ink transition-colors dark:bg-mesh-dark dark:text-white">
      <header className="sticky top-0 z-40 border-b border-white/30 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-night/65">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Logo />
          <div className="hidden items-center gap-1 rounded-full border border-ink/10 bg-white/65 p-1 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 lg:flex">
            {navItems.map((item) => (
              <a className="rounded-full px-4 py-2 transition hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-night" href={`#${item.toLowerCase().replace(" ", "-")}`} key={item}>
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-panel transition hover:-translate-y-0.5 dark:bg-white dark:text-night sm:inline-flex" href="/dashboard">
              Open dashboard
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aurora/25 bg-white/70 px-4 py-2 text-sm font-bold text-aurora shadow-sm backdrop-blur dark:bg-white/10">
            <CheckCircle2 size={16} /> Original AI learning platform
          </div>
          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-normal text-ink dark:text-white sm:text-6xl lg:text-7xl">
            LuminaPath AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">
            A role-aware learning operating system for adaptive courses, career roadmaps, ATS resume analysis, voice tutoring, collaborative study rooms, and skill mastery analytics.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 font-bold text-night shadow-glow transition hover:-translate-y-1" href="/ai-lab">
              Launch AI studio <ArrowRight size={18} />
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 py-3 font-bold text-ink backdrop-blur transition hover:-translate-y-1 dark:border-white/15 dark:bg-white/10 dark:text-white" href="/courses">
              <PlayCircle size={18} /> Explore courses
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
            {identity.palette.map((color) => (
              <div className="rounded-2xl border border-white/55 bg-white/65 p-3 backdrop-blur dark:border-white/10 dark:bg-white/10" key={color.name}>
                <div className="h-8 rounded-xl" style={{ backgroundColor: color.value }} />
                <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">{color.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="rounded-[2rem] border border-white/55 bg-white/70 p-4 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-2 pb-4 dark:border-white/10">
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Today</p>
                <h2 className="font-display text-2xl font-black">Adaptive learning cockpit</h2>
              </div>
              <div className="flex gap-2">
                <button aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 dark:bg-white/10" type="button">
                  <Search size={18} />
                </button>
                <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 dark:bg-white/10" type="button">
                  <Bell size={18} />
                </button>
              </div>
            </div>
            <div className="grid gap-4 pt-4 md:grid-cols-[0.95fr_1.05fr]">
              <DashboardPreview />
              <div className="space-y-4">
                <Panel title="Learning rhythm">
                  <LearningRhythmChart />
                </Panel>
                <div className="grid grid-cols-2 gap-4">
                  <Metric label="Daily streak" value="18" tone="bg-ember" />
                  <Metric label="Badges" value="12" tone="bg-violet" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="platform" className="border-y border-ink/5 bg-white/65 py-16 backdrop-blur dark:border-white/10 dark:bg-night/45">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {roleCards.map((card) => (
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10" key={card.role}>
                <card.icon className="mb-5 text-aurora" size={30} />
                <p className="font-display text-4xl font-black">{card.value}</p>
                <h3 className="mt-1 text-xl font-black">{card.role}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{card.label}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-studio" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-ember">Unique differentiators</p>
            <h2 className="mt-2 font-display text-4xl font-black">AI workflows beyond a standard LMS</h2>
          </div>
          <p className="max-w-xl text-slate-600 dark:text-slate-300">Roadmaps, revision, resume intelligence, peer rooms, and voice tutoring share one learning graph.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((feature) => (
            <article className="rounded-3xl border border-white/60 bg-white/72 p-6 backdrop-blur transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/10" key={feature.title}>
              <feature.icon className="mb-5 text-violet" size={30} />
              <h3 className="text-lg font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="analytics" className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <Panel title="Skill heatmap">
          <SkillHeatmapChart />
        </Panel>
        <Panel title="AI studio queue">
          <div className="grid gap-3 sm:grid-cols-2">
            {aiStudio.map((item) => (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/10" key={item.title}>
                <item.icon className="mb-3 text-aurora" size={22} />
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-300">{item.status}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function DashboardPreview() {
  return (
    <Panel title="Active courses">
      <div className="space-y-4">
        {courses.map((course) => (
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-night/40" key={course.title}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold">{course.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-300">{course.level} · {course.lessons} lessons</p>
              </div>
              <span className="text-sm font-black" style={{ color: course.accent }}>{course.progress}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-2 rounded-full" style={{ width: `${course.progress}%`, backgroundColor: course.accent }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/78 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <h3 className="mb-4 font-display text-lg font-black">{title}</h3>
      {children}
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/78 p-5 dark:border-white/10 dark:bg-white/10">
      <div className={`mb-4 h-2 w-10 rounded-full ${tone}`} />
      <p className="font-display text-3xl font-black">{value}</p>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{label}</p>
    </div>
  );
}
