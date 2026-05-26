import type { Request, Response } from "express";
import { runAiWorkflow } from "../services/aiService.js";
import type { AiMode } from "../types/domain.js";
import { ok } from "../utils/api.js";

export async function generateAiArtifact(req: Request, res: Response) {
  const mode = req.params.mode as AiMode;
  const result = await runAiWorkflow(mode, req.body.prompt, {
    learnerId: req.user?.id,
    role: req.user?.role,
    ...req.body.context
  });
  return ok(res, result);
}
