import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const beverages = await prisma.category.upsert({
    where: {
      name: "Beverages",
    },
    update: {},
    create: {
      name: "Beverages",
    },
  });

  const food = await prisma.category.upsert({
    where: {
      name: "Food",
    },
    update: {},
    create: {
      name: "Food",
    },
  });

  let supplier = await prisma.supplier.findFirst({
    where: {
      name: "ABC Distributors",
    },
  });

  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: {
        name: "ABC Distributors",
        phone: "0112345678",
        email: "abc@example.com",
        address: "Colombo",
      },
    });
  }

  await prisma.product.upsert({
    where: {
      sku: "COKE-500",
    },
    update: {},
    create: {
      name: "Coca-Cola 500ml",
      sku: "COKE-500",
      barcode: "9551234567890",
      description: "500ml soft drink",
      categoryId: beverages.id,
      costPrice: 180,
      sellingPrice: 250,
      minimumStock: 10,
    },
  });

  await prisma.product.upsert({
    where: {
      sku: "BISC-001",
    },
    update: {},
    create: {
      name: "Cream Cracker Biscuits",
      sku: "BISC-001",
      categoryId: food.id,
      costPrice: 120,
      sellingPrice: 170,
      minimumStock: 15,
    },
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });