import { Filters, Product } from "@/interface/products";

export const filterProducts = (products: Product[], filters: Filters) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category === filters.category,
    );
  }

  if (filters.price === "low") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (filters.price === "high") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  if (filters.rating) {
    const selectedRating = parseFloat(filters.rating);
    filtered = filtered.filter(
      (product) =>
        product.rating >= selectedRating && product.rating < selectedRating + 1,
    );
  }

  if (filters.stock === "available") {
    filtered = filtered.filter((product) => product.stock > 0);
  } else if (filters.stock === "sold-out") {
    filtered = filtered.filter((product) => product.stock === 0);
  }

  return filtered;
};
