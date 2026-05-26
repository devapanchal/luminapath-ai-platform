import { Bookmark, Clock, Filter, PlayCircle, Search } from "lucide-react";
import { courses } from "@/lib/product";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-cloud text-ink dark:bg-night dark:text-white">
      <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-aurora">Course catalog</p>
            <h1 className="mt-2 font-display text-4xl font-black">Adaptive paths for career proof</h1>
          </div>
          <div className="flex gap-2">
            <button aria-label="Search courses" className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10" type="button">
              <Search size={18} />
            </button>
            <button aria-label="Filter courses" className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10" type="button">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/5" key={course.title}>
              <div className="mb-8 h-36 rounded-3xl" style={{ background: `linear-gradient(135deg, ${course.accent}, #101828)` }} />
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black dark:bg-white/10">{course.level}</span>
                <button aria-label={`Bookmark ${course.title}`} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-white/10" type="button">
                  <Bookmark size={17} />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-black">{course.title}</h2>
              <div className="mt-5 flex items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-300">
                <span className="inline-flex items-center gap-1"><Clock size={16} /> {course.lessons} lessons</span>
                <span className="inline-flex items-center gap-1"><PlayCircle size={16} /> {course.progress}%</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
