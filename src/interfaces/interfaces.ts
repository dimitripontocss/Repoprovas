import { User,Test } from "@prisma/client";

export type TUser = Omit<User,'id'>
export type TTest = Omit<Test,'id'>

export interface INewTestData {
    name: string;
    pdfUrl: string;
    categoryName: string;
    teacherName: string;
    disciplineName: string;
}

export interface INewUserData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface IError {
    name: string;
    message: string;
}

