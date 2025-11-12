/// <reference types="jest" />
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/modules/app.module";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("App e2e", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api should return Hello World!", async () => {
    const res = await request(app.getHttpServer()).get("/api");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello World!");
  });

  it("GET /api/events should return 200 with array", async () => {
    const res = await request(app.getHttpServer()).get("/api/events");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users should return 200 with array", async () => {
    const res = await request(app.getHttpServer()).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
