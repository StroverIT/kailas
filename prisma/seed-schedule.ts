import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.scheduleEntry.createMany({
    data: [
      {
        day: "Вторник",
        startTime: "19:00",
        endTime: "20:45",
        title: "Йога практика",
        description: null,
      },
      {
        day: "Четвъртък",
        startTime: "19:00",
        endTime: "20:45",
        title: "Йога практика",
        description: null,
      },
      {
        day: "Петък",
        startTime: "20:00",
        endTime: "20:45",
        title: "Йога видя – Йога на предаността",
        description: "Шримад Бхагаватам",
      },
      {
        day: "Събота",
        startTime: "14:00",
        endTime: "15:10",
        title: "Махамритюнджая хаван",
        description: null,
      },
      {
        day: "Събота",
        startTime: "16:00",
        endTime: "16:45",
        title: "Йога видя – мъдростта на Ведите",
        description: null,
      },
      {
        day: "Неделя",
        startTime: "09:00",
        endTime: "10:30",
        title: "Йога за всички",
        description: null,
      },
      {
        day: "Неделя",
        startTime: "14:30",
        endTime: "15:10",
        title: "Звукова медитация с гонг и тибетски купи",
        description: "Присъствено",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("Seeded schedule entries"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
