import { INewTestData } from "../interfaces/interfaces";

import * as testRepository from "../repositories/testRepository";


export async function insertNewTest(newTest: INewTestData) {
    const {categoryId, teacherDisciplineId} = await infoValidator(newTest);

    await testRepository.insertTest({
        name: newTest.name,
        pdfUrl: newTest.pdfUrl,
        categoryId,
        teacherDisciplineId
    });
}

export async function getDisciplineTests(disciplineId:number) {
    const discipline = await testRepository.getDisciplineById(disciplineId);
    if(!discipline)   throw {name: "not_found", message: "Discipline not found"};

    const tests = await testRepository.findTestsByDisciplineId(disciplineId);
    return tests;
}

export async function getTeacherTests(teacherId:number) {
    const teacher = await testRepository.getTeacherById(teacherId);
    if(!teacher)   throw {name: "not_found", message: "Teacher not found"};

    const tests = await testRepository.findTestsByTeacherId(teacherId);
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