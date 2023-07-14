import jwt from "jsonwebtoken";
import createServer from "../app/server";
import { __jwt_secret } from "../config/credentials";

const supertest = require("supertest");

const app = createServer();

export const userPayload = {
  id: 1,
  username: "dika",
};

export const jobPayload = {
  title: "Backend Developer",
  description: "Node JS",
  location: "Surabaya, Indonesia",
  full_time: false,
};

export let jobId = 0;

const token = jwt.sign(userPayload, __jwt_secret ?? "");

describe("jobs", () => {
  describe("Get all jobs after create job", () => {
    describe("create jobs", () => {
      it("should create jobs", async () => {
        const { body, statusCode } = await supertest(app)
          .post(`/api/v1/recruitment/positions`)
          .set("Authorization", `Bearer ${token}`)
          .send(jobPayload);

        jobId = body.id;

        expect(statusCode).toBe(200);
      });
    });

    describe("update single job", () => {
      it("should return job data after creating", async () => {
        const { statusCode } = await supertest(app)
          .put(`/api/v1/recruitment/positions/${jobId}`)
          .set("Authorization", `Bearer ${token}`)
          .send(jobPayload);

        expect(statusCode).toBe(200);
      });
    });

    describe("get all job", () => {
      it("should return jobs data after creating", async () => {
        const { statusCode } = await supertest(app)
          .get(`/api/v1/recruitment/positions`)
          .set("Authorization", `Bearer ${token}`);

        expect(statusCode).toBe(200);
      });
    });

    describe("get single job", () => {
      it("should return job data after creating", async () => {
        const { body, statusCode } = await supertest(app)
          .get(`/api/v1/recruitment/positions/1`)
          .set("Authorization", `Bearer ${token}`);

        console.log(body);
        expect(statusCode).toBe(200);
      });
    });
  });
});
