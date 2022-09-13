import bcrypt from "bcrypt";

import { INewUserData,TUser } from "../interfaces/interfaces.js";
import * as userRepository from "../repositories/userRepository.js";
import jwtGenerator from "../utils/jwtGenerator.js";


export async function signUpService(newUserData: INewUserData) {    
    const alreadyExist = await userRepository.findSingleUser(newUserData.email);
    if(alreadyExist){
        throw {name: "Already used", message: "Cannot use this email try again with a new one." }
    }

    const cryptedPassword = bcrypt.hashSync(newUserData.password, 10); 

    await userRepository.insertUser({email: newUserData.email, password: cryptedPassword});
    
    return;
}

export async function signInService(userData: TUser) {
    const possibleUser = await userRepository.findSingleUser(userData.email);
    if(!possibleUser){
        throw {name: "auth_error", message: "An error ocurred, change your info and try again."};
    }
 
    const isPasswordCorrect = bcrypt.compareSync(userData.password, possibleUser.password);
    if(!isPasswordCorrect){
        throw {name: "auth_error", message: "An error ocurred, change your info and try again."};
    }

    const token = jwtGenerator(possibleUser.id);

    return token;
}


export async function findPossibleUserById(userId:number) {
    const user = await userRepository.findUserById(userId);
    if (!user) throw {name: "not_found", message: "User not found"};

    return user;
}