import { Router } from "express";
import {
  adminAnalytics,
  instructorAnalytics,
  notifications,
  platformIdentity,
  studentDashboard,
  studyRooms
} from "../controllers/catalogController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/identity", asyncHandler(platformIdentity));
router.get("/student/dashboard", authenticate, authorize("student", "admin"), asyncHandler(studentDashboard));
router.get("/instructor/analytics", authenticate, authorize("instructor", "admin"), asyncHandler(instructorAnalytics));
router.get("/admin/analytics", authenticate, authorize("admin"), asyncHandler(adminAnalytics));
router.get("/notifications", authenticate, asyncHandler(notifications));
router.get("/study-rooms", authenticate, asyncHandler(studyRooms));

export default router;
