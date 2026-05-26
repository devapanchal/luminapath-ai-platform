import request from "supertest";
import { createApp } from "./app.js";

const app = createApp();

describe("LuminaPath API", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("logs in a demo learner without requiring a database", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "student@luminapath.ai", password: "Luminapath#2026" });

    expect(response.status).toBe(200);
    expect(response.body.data.user.role).toBe("student");
    expect(response.body.data.accessToken).toBeTruthy();
  });
});
