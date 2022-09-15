import supertest from "supertest";

import app from "../src/index";
import { createToken } from "./factories/authFactory";

export async function getTestsTest() {
    describe("GET /tests/discipline", () => {
        it("returns 200 and tests array", async () => {
            const token = await createToken();
            
            const result = await supertest(app).get("/tests/disciplines").set('Authorization', 'Bearer ' + token);
    
            expect(result.status).toEqual(200);
            expect(result.body).toBeInstanceOf(Array);
                 
        });
    
        it("returns 401 for invalid token", async () => {
                
            const result = await supertest(app).get("/tests/disciplines").set('Authorization', 'Bearer ');
    
            expect(result.status).toEqual(401);             
        });
    });
    
    describe("GET /tests/teachers", () => {
        it("returns 200 and tests array", async () => {
            const token = await createToken();
            
            const result = await supertest(app).get("/tests/teachers").set('Authorization', 'Bearer ' + token);
    
            expect(result.status).toEqual(200);
            expect(result.body).toBeInstanceOf(Array);
                 
        });
    
        it("returns 401 for invalid token", async () => {
                
            const result = await supertest(app).get("/tests/teachers").set('Authorization', 'Bearer ');
    
            expect(result.status).toEqual(401);             
        });
    });
}