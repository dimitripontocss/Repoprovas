import { prisma } from "../databaseStrategy/database.js";

import { TTest } from "../interfaces/interfaces.js";

export async function getCategoryById(id: number) {
    const result = await prisma.category.findUnique({
        where:{id}
    })
    return result;
}

export async function getDisciplineById(id: number) {
    const result = await prisma.discipline.findUnique({
        where:{id}
    })
    return result;
}

export async function getTeacherById(id: number) {
    const result = await prisma.teacher.findUnique({
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