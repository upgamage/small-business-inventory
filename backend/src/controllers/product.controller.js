import { getAllProducts } from "../services/product.service.js";

export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Failed to get products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
}