import ProductCard from "@/app/products/ProductCard";
import ProductCounter from "@/app/products/[id]/ProductCounter";

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);
  const product = await res.json();

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
