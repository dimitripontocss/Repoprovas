import { faker } from '@faker-js/faker';

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