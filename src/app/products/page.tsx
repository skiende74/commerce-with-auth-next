"use client";
import Link from "next/link";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center">상품 목록</h2>
      <ul className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
          >
            <ProductCard
              title={product.title}
              image={product.image}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
