import { prisma } from "../databaseStrategy/database.js";
import { TUser } from "../interfaces/interfaces.js"

export async function insertUser(userData: TUser) {
    await prisma.user.create({
        data: userData
    })
}

export async function findSingleUser(email: string) {
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return result;
}

