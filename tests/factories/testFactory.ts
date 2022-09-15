import { faker } from "@faker-js/faker";

import { prisma } from "../../src/databaseStrategy/database";

export async function createTest() {
    const category = await prisma.category.findFirst({
        select:{
            name:true
        }
    });
    const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
        select:{
            teacher:{
                select:{
                    name:true
                }
            },
            discipline:{
                select:{
                    name:true
                }
            }
        }
    })
    
    return {
            name: faker.name.jobArea(),
            pdfUrl: faker.internet.url(),
            categoryName: category.name,
            teacherName: teacherDiscipline.teacher.name,
            disciplineName: teacherDiscipline.discipline.name
        }
}

export async function createWrongCategoryTest() {
    const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
        select:{
            teacher:{
                select:{
                    name:true
                }
            },
            discipline:{
                select:{
                    name:true
                }
            }
        }
    })
    
    return {
            name: faker.name.jobArea(),
            pdfUrl: faker.internet.url(),
            categoryName: faker.name.jobArea(),
            teacherName: teacherDiscipline.teacher.name,
            disciplineName: teacherDiscipline.discipline.name
        }
}

export async function createWrongTeacherTest() {
    const category = await prisma.category.findFirst({
        select:{
            name:true
        }
    });
    const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
        select:{
            discipline:{
                select:{
                    name:true
                }
            }
        }
    })
    
    return {
            name: faker.name.jobArea(),
            pdfUrl: faker.internet.url(),
            categoryName: category.name,
            teacherName: faker.name.firstName(),
            disciplineName: teacherDiscipline.discipline.name
        }
}