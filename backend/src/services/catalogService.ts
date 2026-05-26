export const productIdentity = {
  selectedName: "LuminaPath AI",
  nameOptions: ["LuminaPath AI", "SkillHarbor", "CortexTrail Academy", "NovaMentor LMS", "PathWise Learning"],
  logoConcept:
    "A split horizon mark: an open learning path crossing a luminous neural node, signaling guided mastery and AI coaching.",
  palette: {
    ink: "#101828",
    cloud: "#f7fbff",
    aurora: "#19c7b7",
    ember: "#ff8a4c",
    violet: "#7161ef",
    night: "#09111f"
  }
};

export const courses = [
  {
    id: "course-ai-product",
    title: "AI Product Engineering",
    level: "Intermediate",
    instructor: "Ira Shah",
    lessons: 42,
    rating: 4.9,
    skills: ["LLM APIs", "Evaluation", "UX systems"],
    status: "approved"
  },
  {
    id: "course-data-systems",
    title: "Data Systems for Builders",
    level: "Advanced",
    instructor: "Samir Rao",
    lessons: 36,
    rating: 4.8,
    skills: ["PostgreSQL", "Redis", "Analytics"],
    status: "approved"
  },
  {
    id: "course-career-ops",
    title: "Career Operating System",
    level: "Beginner",
    instructor: "Anika Bose",
    lessons: 24,
    rating: 4.7,
    skills: ["ATS", "Interviewing", "Portfolio"],
    status: "pending"
  }
];

export const dashboardMetrics = {
  student: {
    streak: 18,
    progress: 68,
    weakTopics: ["vector databases", "rate limiting", "system design tradeoffs"],
    badges: ["Revision Architect", "Quiz Sprinter", "Peer Mentor"],
    upcoming: ["AI mock interview", "Postgres indexes assignment", "Study room: API security"]
  },
  instructor: {
    activeLearners: 1248,
    assignmentQueue: 36,
    completionRate: 79,
    atRiskLearners: 42
  },
  admin: {
    users: 18420,
    revenue: 284750,
    moderationQueue: 12,
    courseApprovals: 9
  }
};
