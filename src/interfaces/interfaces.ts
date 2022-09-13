import { User,Test } from "@prisma/client";

export type TUser = Omit<User,'id'>
export type TTest = Omit<Test,'id'>

export interface INewUserData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface IError {
    name: string;
    message: string;
}

