import Link from "next/link";
import { Product } from "./model";
import ProductCard from "./ProductCard";

export async function getProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, { cache: "force-cache" });
  return (await response.json()) as Product[];
}

async function ProductList() {
  const products = await getProducts();

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
