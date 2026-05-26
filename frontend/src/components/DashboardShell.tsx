"use client";

import { motion } from "framer-motion";
import { Bell, BookMarked, CalendarDays, ClipboardCheck, FileUp, Flame, LayoutDashboard, Mic2, Settings, Shield, Sparkles, Users } from "lucide-react";
import { LearningRhythmChart, SkillHeatmapChart } from "./Charts";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { courses } from "@/lib/product";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Courses", icon: BookMarked },
  { label: "Planner", icon: CalendarDays },
  { label: "AI Tutor", icon: Mic2 },
  { label: "Assignments", icon: ClipboardCheck },
  { label: "Study Rooms", icon: Users },
  { label: "Admin", icon: Shield },
  { label: "Settings", icon: Settings }
];

export function DashboardShell() {
  return (
    <main className="min-h-screen bg-cloud text-ink dark:bg-night dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white/85 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5 lg:block">
          <Logo />
          <div className="mt-8 space-y-1">
            {menu.map((item, index) => (
              <button
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${index === 0 ? "bg-ink text-white dark:bg-white dark:text-night" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`}
                key={item.label}
                type="button"
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-cloud/80 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-night/80 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-bold text-aurora">Student workspace</p>
              <h1 className="font-display text-2xl font-black">Learning cockpit</h1>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10" type="button">
                <Bell size={18} />
              </button>
              <ThemeToggle />
            </div>
          </header>

          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_360px] lg:p-8">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat icon={Flame} label="Daily streak" value="18 days" tone="bg-ember" />
                <Stat icon={Sparkles} label="AI artifacts" value="42" tone="bg-aurora" />
                <Stat icon={ClipboardCheck} label="Assignments" value="7/9" tone="bg-violet" />
                <Stat icon={FileUp} label="ATS score" value="86" tone="bg-ink" />
              </div>

              <DashboardPanel title="Weekly learning rhythm">
                <LearningRhythmChart />
              </DashboardPanel>

              <DashboardPanel title="Skill heatmap">
                <SkillHeatmapChart />
              </DashboardPanel>
            </div>

            <div className="space-y-5">
              <DashboardPanel title="Smart revision queue">
                <div className="space-y-3">
                  {["Redis cache invalidation", "JWT refresh rotation", "Behavioral interview STAR stories"].map((item, index) => (
                    <motion.div
                      className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/10"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      key={item}
                    >
                      <p className="font-bold">{item}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Due in {index + 1} day{index ? "s" : ""}</p>
                    </motion.div>
                  ))}
                </div>
              </DashboardPanel>

              <DashboardPanel title="Enrolled courses">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.title}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-bold">{course.title}</span>
                        <span className="font-black">{course.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                        <div className="h-2 rounded-full" style={{ width: `${course.progress}%`, backgroundColor: course.accent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardPanel>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-4 font-display text-lg font-black">{title}</h2>
      {children}
    </section>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Flame; label: string; value: string; tone: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl text-white ${tone}`}>
        <Icon size={20} />
      </div>
      <p className="font-display text-2xl font-black">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{label}</p>
    </div>
  );
}
