import supertest from "supertest";

import app from "../src/index";
import { prisma } from "../src/databaseStrategy/database"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

describe("POST /signup", () => {
    it("returns 201 for valid new user", async () => {
        const body = {
            email: "dimitri@m.com",
            password: "abc123",
            passwordConfirmation: "abc123"
        };

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });

    it("returns 422 for wrong info", async () => {
        const body = {
            email: "dimitri@m.com",
            password: "",
            passwordConfirmation: "abc123"
        };

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    });

    it("returns 409 for duplicated email", async () => {
        const body = {
            email: "dimitri@m.com",
            password: "abc123",
            passwordConfirmation: "abc123"
        };

        await supertest(app).post("/signup").send(body);
        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(409);
    });
});

describe("POST /signin", () => {
    it("returns 200 and token for valid user", async () => {
        const signUpBody = {
            email: "dimitri@m.com",
            password: "abc123",
            passwordConfirmation: "abc123"
        };
        const signInBody = {
            email: "dimitri@m.com",
            password: "abc123",
        };

        await supertest(app).post("/signup").send(signUpBody);
        const result = await supertest(app).post("/signin").send(signInBody);
        const status = result.status;
        const body = result.body;
        console.log(body.token);

        expect(status).toEqual(200);
        expect(body).toHaveProperty('token');        
    });

    it("returns 401 for invalid user", async () => {
        const body = {
            email: "dimitri@m.com",
            password: "abc123",
        };

        const result = await supertest(app).post("/signin").send(body);
        const status = result.status;

        expect(status).toEqual(401);        
    });

    it("returns 422 for invalid user format", async () => {
        const body = {
            email: "dimitri@m.com",
            password: "",
        };

        const result = await supertest(app).post("/signin").send(body);
        const status = result.status;

        expect(status).toEqual(422);        
    });

});

afterAll(async () => {
    await prisma.$disconnect();
});