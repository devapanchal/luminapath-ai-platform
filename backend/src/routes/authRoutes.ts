import { Router } from "express";
import { z } from "zod";
import { forgotPassword, googleLogin, login, logout, refresh, register, verifyEmail } from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const credentials = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});

router.post(
  "/register",
  validate(
    z.object({
      body: credentials.shape.body.extend({
        name: z.string().min(2).max(80),
        role: z.enum(["student", "instructor", "admin"]).optional()
      })
    })
  ),
  asyncHandler(register)
);
router.post("/login", validate(credentials), asyncHandler(login));
router.post("/google", validate(z.object({ body: z.object({ credential: z.string().min(20) }) })), asyncHandler(googleLogin));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));
router.post("/forgot-password", validate(z.object({ body: z.object({ email: z.string().email() }) })), asyncHandler(forgotPassword));
router.post("/verify-email", validate(z.object({ body: z.object({ token: z.string().min(8) }) })), asyncHandler(verifyEmail));

export default router;
