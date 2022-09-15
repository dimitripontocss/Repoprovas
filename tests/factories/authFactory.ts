import { faker } from '@faker-js/faker';
import supertest from 'supertest';

import app from '../../src';

export async function createSignUpUser() {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password,
        passwordConfirmation: password
    };
}

export async function createSignInUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

export async function createToken() {
    const signUpBody = await createSignUpUser();
        
        const signInBody = {
            email: signUpBody.email,
            password: signUpBody.password
        }

        await supertest(app).post("/signup").send(signUpBody);
        const signInResult = await supertest(app).post("/signin").send(signInBody);
        const {token} = signInResult.body;
        return token;
}
