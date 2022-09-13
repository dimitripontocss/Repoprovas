import { TTest } from "../interfaces/interfaces.js";

import * as testRepository from "../repositories/testRepository.js";


export async function insertNewTest(newTest: TTest) {
    const category = await testRepository.getCategoryById(newTest.categoryId);
    if(!category)   throw {name: "not_found", message: "Category not found"};

    const teacherDiscipline = await testRepository.getTeacherDisciplineById(newTest.teacherDisciplineId);
    if(!teacherDiscipline)  throw {name: "not_found", message: "Discipline not found"};

    await testRepository.insertTest(newTest);
}
