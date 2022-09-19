import dotenv from "dotenv";

import {
  categories,
  disciplines,
  teachers,
  teachersDisciplines,
  terms,
} from "./data";
import { prisma } from "../src/databaseStrategy/database";

dotenv.config();

console.log("seed running on base" + process.env.DATABASE_URL);

async function seed() {
  const signal = await prisma.teacherDiscipline.findFirst();
  await prisma.user.deleteMany({});
  if (!signal) {
    await prisma.term.createMany({
      data: terms,
    });
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.teacher.createMany({
      data: teachers,
    });
    await prisma.discipline.createMany({
      data: disciplines,
    });
    await prisma.teacherDiscipline.createMany({
      data: teachersDisciplines,
    });
  }
}
seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
