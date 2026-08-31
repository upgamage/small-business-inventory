import prisma from "../utils/prisma.js";

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
}