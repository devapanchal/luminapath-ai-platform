import type { Request, Response } from "express";
import { courses, dashboardMetrics, productIdentity } from "../services/catalogService.js";
import { ok } from "../utils/api.js";

export async function platformIdentity(_req: Request, res: Response) {
  return ok(res, productIdentity);
}

export async function listCourses(_req: Request, res: Response) {
  return ok(res, courses);
}

export async function createCourse(req: Request, res: Response) {
  return ok(
    res,
    {
      id: `course-${Date.now()}`,
      status: "draft",
      ...req.body
    },
    201
  );
}

export async function enrollCourse(req: Request, res: Response) {
  return ok(res, { courseId: req.params.courseId, learnerId: req.user?.id, status: "enrolled" });
}

export async function updateProgress(req: Request, res: Response) {
  return ok(res, {
    courseId: req.params.courseId,
    learnerId: req.user?.id,
    completedLessonId: req.body.lessonId,
    progress: req.body.progress
  });
}

export async function bookmarkLesson(req: Request, res: Response) {
  return ok(res, { lessonId: req.body.lessonId, bookmarked: true });
}

export async function studentDashboard(_req: Request, res: Response) {
  return ok(res, dashboardMetrics.student);
}

export async function instructorAnalytics(_req: Request, res: Response) {
  return ok(res, dashboardMetrics.instructor);
}

export async function adminAnalytics(_req: Request, res: Response) {
  return ok(res, dashboardMetrics.admin);
}

export async function notifications(_req: Request, res: Response) {
  return ok(res, [
    { id: "n1", title: "Smart revision due", type: "revision", read: false },
    { id: "n2", title: "Instructor reviewed your assignment", type: "assignment", read: false },
    { id: "n3", title: "Study room starts in 15 minutes", type: "peer-learning", read: true }
  ]);
}

export async function studyRooms(_req: Request, res: Response) {
  return ok(res, [
    { id: "room-api-security", title: "API Security Sprint", learners: 18, mode: "collaborative" },
    { id: "room-career-roadmap", title: "Career Roadmap Clinic", learners: 11, mode: "voice-tutor" }
  ]);
}
