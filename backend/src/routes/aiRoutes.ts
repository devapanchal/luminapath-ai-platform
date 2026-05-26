import { Router } from "express";
import { z } from "zod";
import { generateAiArtifact } from "../controllers/aiController.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
const modes = ["study-planner", "quiz-generator", "career-roadmap", "resume-ats", "mock-interview", "flashcards", "recommendations"] as const;

router.post(
  "/:mode",
  authenticate,
  validate(
    z.object({
      params: z.object({ mode: z.enum(modes) }),
      body: z.object({
        prompt: z.string().min(2).max(5000),
        context: z.record(z.unknown()).default({})
      })
    })
  ),
  asyncHandler(generateAiArtifact)
);

export default router;
