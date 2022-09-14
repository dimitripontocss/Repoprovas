import { prisma } from "../databaseStrategy/database";

import { TTest } from "../interfaces/interfaces";

export async function getCategoryByName(name: string) {
    const result = await prisma.category.findUnique({
        where:{name}
    })
    return result;
}

export async function getDisciplineById(id: number) {
    const result = await prisma.discipline.findUnique({
        where:{id}
    })
    return result;
}

export async function getDisciplineByName(name: string) {
    const result = await prisma.discipline.findUnique({
        where:{name}
    })
    return result;
}

export async function getTeacherById(id: number) {
    const result = await prisma.teacher.findUnique({
        where:{id}
    })
    return result;
}

export async function getTeacherByName(name: string) {
    const result = await prisma.teacher.findUnique({
        where:{name}
    })
    return result;
}

export async function getTeacherDisciplineByIds(teacherId: number, disciplineId: number) {
    const result = await prisma.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    })
    return result;
}

export async function insertTest(newTest: TTest) {
    await prisma.test.create({
        data: newTest
    })
}

export async function findTestsByDisciplineId(disciplineId:number) {
    const result = await prisma.teacherDiscipline.findMany({
        where:{disciplineId},
        select:{
            discipline:{
                select:{
                    name:true,
                    teacherDiscipline:{
                        select:{
                            tests:{
                                select:{
                                    name:true,
                                    category:{
                                        select:{
                                            name:true
                                        }
                                    },
                                    teacherDiscipline:{
                                        select:{
                                            teacher:{
                                                select:{
                                                    name:true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return result;
}

export async function findTestsByTeacherId(teacherId:number) {
    const result = await prisma.teacherDiscipline.findFirst({
        where:{teacherId},
        select:{
            teacher:{
                select:{
                    name:true,
                    teacherDiscipline:{
                        select:{
                            tests:{
                                select:{
                                    name:true,
                                    category:{
                                        select:{
                                            name:true
                                        }
                                    },
                                    teacherDiscipline:{
                                        select:{
                                            discipline:{
                                                select:{
                                                    name:true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return result;
}