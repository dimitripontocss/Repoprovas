import { TTest } from "../interfaces/interfaces.js";

import * as testRepository from "../repositories/testRepository.js";


export async function insertNewTest(newTest: TTest) {
    await isCategory(newTest.categoryId);

    const teacherDiscipline = await testRepository.getTeacherDisciplineById(newTest.teacherDisciplineId);
    if(!teacherDiscipline)  throw {name: "not_found", message: "Discipline not found"};

    await testRepository.insertTest(newTest);
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


async function isCategory(categoryId:number) {
    const category = await testRepository.getCategoryById(categoryId);
    if(!category)   throw {name: "not_found", message: "Category not found"};
}