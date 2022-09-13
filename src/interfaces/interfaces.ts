import { User } from "@prisma/client";

export type TUser = Omit<User,'id'>

export interface INewUserData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface IError {
    name: string;
    message: string;
}
