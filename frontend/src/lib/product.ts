import {
  AudioLines,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  FileSearch,
  Flame,
  GitBranch,
  GraduationCap,
  MessageSquare,
  Radar,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";

export const identity = {
  selectedName: "LuminaPath AI",
  nameOptions: ["LuminaPath AI", "SkillHarbor", "CortexTrail Academy", "NovaMentor LMS", "PathWise Learning"],
  logoConcept:
    "An open horizon path crossing a luminous neural node, representing guided mastery with adaptive AI coaching.",
  palette: [
    { name: "Ink", value: "#101828" },
    { name: "Cloud", value: "#f7fbff" },
    { name: "Aurora", value: "#19c7b7" },
    { name: "Ember", value: "#ff8a4c" },
    { name: "Violet", value: "#7161ef" },
    { name: "Night", value: "#09111f" }
  ]
};

export const navItems = ["Platform", "AI Studio", "Rooms", "Analytics", "Docs"];

export const roleCards = [
  {
    role: "Student",
    icon: GraduationCap,
    value: "68%",
    label: "path mastery",
    detail: "Study planner, quiz generation, bookmarks, notes, streaks, mock interviews, and ATS feedback."
  },
  {
    role: "Instructor",
    icon: BookOpenCheck,
    value: "1.2k",
    label: "active learners",
    detail: "Course creation, video/PDF uploads, assignment review, weak-topic insights, and learner cohorts."
  },
  {
    role: "Admin",
    icon: ShieldCheck,
    value: "$284k",
    label: "tracked revenue",
    detail: "Approvals, moderation, revenue analytics, audit logs, user management, and platform health."
  }
];

export const differentiators = [
  { title: "Career Roadmaps", icon: GitBranch, copy: "AI maps target roles to milestones, portfolio proof, and interview practice." },
  { title: "ATS Resume Lab", icon: FileSearch, copy: "Resume scoring, keyword gaps, impact rewrites, and recruiter-readiness checks." },
  { title: "Voice Tutor", icon: AudioLines, copy: "A voice-first coaching surface for explanations, recall, and mock interviews." },
  { title: "Study Rooms", icon: UsersRound, copy: "Real-time peer rooms with goals, notes, and shared revision boards." },
  { title: "Skill Heatmaps", icon: Radar, copy: "Weak-topic detection turns quizzes, assignments, and notes into mastery maps." },
  { title: "Smart Revision", icon: CalendarClock, copy: "Spaced repetition, flashcards, and adaptive difficulty scheduling." }
];

export const courses = [
  { title: "AI Product Engineering", progress: 68, level: "Intermediate", accent: "#19c7b7", lessons: 42 },
  { title: "Data Systems for Builders", progress: 46, level: "Advanced", accent: "#7161ef", lessons: 36 },
  { title: "Career Operating System", progress: 24, level: "Beginner", accent: "#ff8a4c", lessons: 24 }
];

export const heatmap = [
  { skill: "Prompt APIs", student: 88, cohort: 74 },
  { skill: "Postgres", student: 62, cohort: 69 },
  { skill: "Redis", student: 48, cohort: 61 },
  { skill: "Security", student: 73, cohort: 66 },
  { skill: "System Design", student: 54, cohort: 59 },
  { skill: "Interviews", student: 81, cohort: 64 }
];

export const activity = [
  { day: "Mon", minutes: 55, quizzes: 3 },
  { day: "Tue", minutes: 40, quizzes: 2 },
  { day: "Wed", minutes: 72, quizzes: 4 },
  { day: "Thu", minutes: 48, quizzes: 2 },
  { day: "Fri", minutes: 90, quizzes: 5 },
  { day: "Sat", minutes: 64, quizzes: 3 },
  { day: "Sun", minutes: 80, quizzes: 4 }
];

export const aiStudio = [
  { title: "Study Planner", icon: BrainCircuit, status: "Adaptive", tone: "aurora" },
  { title: "Quiz Generator", icon: Sparkles, status: "Difficulty aware", tone: "violet" },
  { title: "Mock Interview", icon: MessageSquare, status: "Rubric scored", tone: "ember" },
  { title: "Flashcards", icon: BadgeCheck, status: "Spaced recall", tone: "aurora" },
  { title: "Recommendation Engine", icon: BarChart3, status: "Personalized", tone: "violet" },
  { title: "Daily Streak Coach", icon: Flame, status: "Momentum", tone: "ember" }
];
