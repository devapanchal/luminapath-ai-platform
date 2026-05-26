import OpenAI from "openai";
import { env } from "../config/env.js";
import type { AiMode } from "../types/domain.js";

const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

const systemPrompts: Record<AiMode, string> = {
  "study-planner": "Create an adaptive weekly study plan with spaced revision, weak topic repair, and assessment checkpoints.",
  "quiz-generator": "Generate concise concept-check questions with answers and difficulty labels.",
  "career-roadmap": "Design a practical career roadmap with skill milestones, projects, portfolio proof, and interview prep.",
  "resume-ats": "Analyze a resume against ATS criteria, return score drivers, missing keywords, risks, and rewrite suggestions.",
  "mock-interview": "Simulate a structured mock interview with role-specific questions, rubrics, and feedback.",
  flashcards: "Create active-recall flashcards with fronts, backs, tags, and revision intervals.",
  recommendations: "Recommend personalized learning resources based on goals, progress, weak topics, and time budget."
};

export async function runAiWorkflow(mode: AiMode, prompt: string, context: Record<string, unknown> = {}) {
  if (!openai) return fallbackResponse(mode, prompt, context);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.35,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: `${systemPrompts[mode]} Return compact JSON for an LMS product API.` },
      { role: "user", content: JSON.stringify({ prompt, context }) }
    ]
  });

  const content = response.choices[0]?.message?.content;
  return content ? JSON.parse(content) : fallbackResponse(mode, prompt, context);
}

function fallbackResponse(mode: AiMode, prompt: string, context: Record<string, unknown>) {
  const topic = prompt || "full-stack engineering";
  return {
    mode,
    generatedAt: new Date().toISOString(),
    summary: `Demo AI response for ${topic}. Add OPENAI_API_KEY to enable live model output.`,
    context,
    actions: [
      "Review the diagnostic scorecard and mark weak concepts.",
      "Complete one applied project task before taking the next quiz.",
      "Schedule a 25-minute smart revision block within 48 hours."
    ],
    artifacts:
      mode === "flashcards"
        ? [
            { front: `What is the core idea behind ${topic}?`, back: "Explain it with one example.", intervalDays: 1 },
            { front: `Where do learners usually get stuck in ${topic}?`, back: "Identify one misconception and repair step.", intervalDays: 3 }
          ]
        : []
  };
}
