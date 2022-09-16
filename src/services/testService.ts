import { INewTestData } from "../interfaces/interfaces";

import * as testRepository from "../repositories/testRepository";


export async function insertNewTest(newTest: INewTestData) {
    const {categoryId, teacherDisciplineId} = await infoValidator(newTest);

    return await testRepository.insertTest({
        name: newTest.name,
        pdfUrl: newTest.pdfUrl,
        categoryId,
        teacherDisciplineId
    });
}

export async function getDisciplineTests() {
    const tests = await testRepository.findTestsByDisciplineId() as any;

    tests.forEach(i=>{
        i.disciplines.forEach(j=>{
            j.teacherDiscipline.forEach(k=>{
                const teacher = k.teacher.name
                delete k.teacher
                k.tests.forEach(l=>{
                    l.teacher = teacher
                    l.category = l.category.name
                })
            })
        })
    })

    return tests;
}

export async function getTeacherTests() {
    const tests = await testRepository.findTestsByTeacherId() as any;

    tests.forEach(i=>{
        i.teacherDiscipline.forEach(j=>{
            j.tests.forEach(k=>{
                const discipline = k.teacherDiscipline.discipline.name
                k.category = k.category.name
                k.discipline = discipline
                delete k.teacherDiscipline
            })
        })
    })

    return tests;
}


async function infoValidator(newTest: INewTestData) {
    const category = await testRepository.getCategoryByName(newTest.categoryName);
    if(!category)   throw {name: "not_found", message: "Category not found"};
    const categoryId = category.id;

    const teacher = await testRepository.getTeacherByName(newTest.teacherName);
    if(!teacher)   throw {name: "not_found", message: "Teacher not found"};

    const discipline = await testRepository.getDisciplineByName(newTest.disciplineName);
    if(!discipline)   throw {name: "not_found", message: "Discipline not found"};

    const teacherDiscipline = await testRepository.getTeacherDisciplineByIds(teacher.id,discipline.id);
    if(!teacherDiscipline)   throw {name: "not_found", message: "This relation betwen teacher and discipline dont exist"};
    const teacherDisciplineId = teacherDiscipline.id;

    return {categoryId, teacherDisciplineId};
}