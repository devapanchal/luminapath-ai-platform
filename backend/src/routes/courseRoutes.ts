import { Router } from "express";
import { z } from "zod";
import {
  bookmarkLesson,
  createCourse,
  enrollCourse,
  listCourses,
  updateProgress
} from "../controllers/catalogController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(listCourses));
router.post(
  "/",
  authenticate,
  authorize("instructor", "admin"),
  validate(
    z.object({
      body: z.object({
        title: z.string().min(4),
        description: z.string().min(20),
        level: z.enum(["Beginner", "Intermediate", "Advanced"]),
        skills: z.array(z.string()).default([])
      })
    })
  ),
  asyncHandler(createCourse)
);
router.post("/:courseId/enroll", authenticate, asyncHandler(enrollCourse));
router.patch(
  "/:courseId/progress",
  authenticate,
  validate(z.object({ body: z.object({ lessonId: z.string(), progress: z.number().min(0).max(100) }) })),
  asyncHandler(updateProgress)
);
router.post(
  "/:courseId/bookmarks",
  authenticate,
  validate(z.object({ body: z.object({ lessonId: z.string() }) })),
  asyncHandler(bookmarkLesson)
);

export default router;
