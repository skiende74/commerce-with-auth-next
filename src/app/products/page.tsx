import Link from "next/link";
import { Product } from "./model";
import ProductCard from "./ProductCard";
import { supabase } from "@/workspace/supabase";

export async function getProducts() {
  const response = await supabase.from("item").select("*").range(0, 19).throwOnError();
  return response.data;
}

// to migrate data from fakeapi to real DB
async function uploadProducts(products: Product[]) {
  const newProducts = products.map(({ id: _, rating: _2, ...rest }) => ({ ...rest }));
  await supabase.from("item").insert(newProducts);
}
async function ProductList() {
  const products = await getProducts();
  // await uploadProducts(products);

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
