import bcrypt from "bcrypt";

import { INewUserData,TUser } from "../interfaces/interfaces.js";
import * as authRepository from "../repositories/authRepository.js";
import jwtGenerator from "../utils/jwtGenerator.js";


export async function signUpService(newUserData: INewUserData) {    
    const alreadyExist = await authRepository.findSingleUser(newUserData.email);
    if(alreadyExist){
        throw {name: "Already used", message: "Cannot use this email try again with a new one." }
    }

    const cryptedPassword = bcrypt.hashSync(newUserData.password, 10); 

    await authRepository.insertUser({email: newUserData.email, password: cryptedPassword});
    
    return;
}

export async function signInService(userData: TUser) {
    const possibleUser = await authRepository.findSingleUser(userData.email);
    if(!possibleUser){
        throw {name: "Login_Error", message: "An error ocurred, change your info and try again."};
    }
 
    const isPasswordCorrect = bcrypt.compareSync(userData.password, possibleUser.password);
    if(!isPasswordCorrect){
        throw {name: "Login_Error", message: "An error ocurred, change your info and try again."};
    }

    const token = jwtGenerator(possibleUser.id);

    return token;
}