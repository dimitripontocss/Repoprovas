import { prisma } from "../databaseStrategy/database.js";

import { TTest } from "../interfaces/interfaces.js";

export async function getCategoryById(id: number) {
    const result = await prisma.category.findUnique({
        where:{id}
    })
    return result;
}

export async function getTeacherDisciplineById(id: number) {
    const result = await prisma.teacherDiscipline.findUnique({
        where:{id}
    })
    return result;
}

export async function insertTest(newTest: TTest) {
    await prisma.test.create({
        data: newTest
    })
}