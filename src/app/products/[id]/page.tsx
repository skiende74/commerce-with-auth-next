import ProductCard from "@/app/products/ProductCard";
import ProductCounter from "@/app/products/[id]/ProductCounter";
import { supabase } from "@/workspace/supabase";

export async function getProduct(id: string) {
  const data = await supabase.from("item").select("*").eq("id", Number(id)).single();
  return data.data;
}

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

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
