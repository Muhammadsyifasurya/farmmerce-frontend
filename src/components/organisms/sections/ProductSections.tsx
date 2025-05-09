import { useState, useEffect } from "react";

import { filterProducts } from "@/utils/filterProducts";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { CardItem } from "@/components/ui/CardItem";
import { Product } from "@/interface/products";
import { addToCart } from "@/app/stores/products/cartStores";
import { useRouter } from "next/navigation";
import { CreditCard, ShoppingCart } from "lucide-react";

interface ProductSectionProps {
  products: Product[];
}

export const ProductSection = ({ products }: ProductSectionProps) => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    stock: "",
  });
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const result = filterProducts(products, filters);
    setFilteredProducts(result);
  }, [filters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      {/* Filter Section */}
      <section className="flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <FilterSelect
              placeholder="All Category"
              options={Array.from(
                new Set(products.map((product) => product.category)),
              ).map((category) => ({
                label: category,
                value: category,
              }))}
              onChange={(value) => handleFilterChange("category", value)}
            />

            <FilterSelect
              placeholder="All Price"
              options={[
                { label: "Lowest Price", value: "low" },
                { label: "Highest Price", value: "high" },
              ]}
              onChange={(value) => handleFilterChange("price", value)}
            />

            <FilterSelect
              placeholder="All Rating"
              options={[
                { label: "⭐⭐⭐⭐⭐", value: "5" },
                { label: "⭐⭐⭐⭐", value: "4" },
                { label: "⭐⭐⭐", value: "3" },
                { label: "⭐⭐", value: "2" },
                { label: "⭐", value: "1" },
              ]}
              onChange={(value) => handleFilterChange("rating", value)}
            />

            <FilterSelect
              placeholder="All Stock"
              options={[
                { label: "In Stock", value: "available" },
                { label: "Out of Stock", value: "sold-out" },
              ]}
              onChange={(value) => handleFilterChange("stock", value)}
            />
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section className="flex flex-wrap justify-center gap-3 p-4 md:gap-9 xl:gap-14 2xl:px-52">
        {filteredProducts.map((product) => (
          <CardItem
            key={product.id}
            data={product}
            addToCartLabel="Add to Cart"
            addToCartIcon={<ShoppingCart size={16} />}
            buyNowIcon={<CreditCard size={16} />}
            buyNowLabel="Buy Now"
            onAddToCartClick={(item) => {
              const cartItem = {
                ...item,
                quantity: 1,
                unit: item.unit || "pcs",
              };
              addToCart(cartItem);
              console.log("Tambah ke keranjang:", cartItem);
            }}
            onBuyNowClick={(item) => {
              const cartItem = {
                ...item,
                quantity: 1,
                unit: item.unit || "pcs",
              };
              addToCart(cartItem);
              console.log("Beli sekarang:", item);
              router.push("/checkout");
            }}
          />
        ))}
      </section>
    </>
  );
};
