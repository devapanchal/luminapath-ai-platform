export type Role = "student" | "instructor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type AiMode =
  | "study-planner"
  | "quiz-generator"
  | "career-roadmap"
  | "resume-ats"
  | "mock-interview"
  | "flashcards"
  | "recommendations";
