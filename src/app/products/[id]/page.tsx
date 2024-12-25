"use client";
import ProductCard from "@/app/products/ProductCard";
import ProductCounter from "@/app/products/[id]/ProductCounter";
import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2 className="text-center">상품 상세</h2>
      {product && (
        <ProductCard
          title={product.title}
          image={product.image}
          description={product.description}
        />
      )}
      {product && <ProductCounter />}
    </div>
  );
}

export default ProductDetail;
