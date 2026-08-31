import prisma from "./utils/prisma.js";

async function main() {
  const categories = await prisma.category.findMany();

  console.log("Categories:", categories);
}

main()
  .catch((error) => {
    console.error("Database test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });