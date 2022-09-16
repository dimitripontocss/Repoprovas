import supertest from "supertest";

import app from "../src/index";
import { prisma } from "../src/databaseStrategy/database";
import { createToken } from "./factories/authFactory";
import { createTest, createWrongCategoryTest, createWrongTeacherTest } from "./factories/testFactory"

export async function createTestTest() {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    });

    describe("POST /test", () => {
        it("returns 201 for created test", async () => {
            const token = await createToken();
    
            const test = await createTest();
            
            const result = await supertest(app).post("/test").set('Authorization', 'Bearer ' + token).send(test);
    
            expect(result.status).toEqual(201);     
            expect(result.body).toBeInstanceOf(Object);      
        });
    
        it("returns 422 for wrong format test", async () => {
            const token = await createToken();
    
            const test = await createTest();
            test.pdfUrl = "";
            
            const result = await supertest(app).post("/test").set('Authorization', 'Bearer ' + token).send(test);
    
            expect(result.status).toEqual(422);           
        });
    
        it("returns 404 for non existing category", async () => {
            const token = await createToken();
    
            const test = await createWrongCategoryTest();
            
            const result = await supertest(app).post("/test").set('Authorization', 'Bearer ' + token).send(test);
    
            expect(result.status).toEqual(404);           
        });
    
        it("returns 404 for non existing teacher", async () => {
            const token = await createToken();
    
            const test = await createWrongTeacherTest();
            
            const result = await supertest(app).post("/test").set('Authorization', 'Bearer ' + token).send(test);
    
            expect(result.status).toEqual(404);           
        });
    });

    afterAll(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE tests`
        await prisma.$disconnect();
    });
}