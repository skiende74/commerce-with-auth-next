import Modal from "@/app/_component/Modal";
import React from "react";
import ProductCard from "../../ProductCard";
import { getProduct } from "../../[id]/page";

async function ProductModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <Modal
      title="상품 상세"
      isOpen={true}
      onClose={async () => {
        "use server";
        // redirect("/products");
      }}
    >
      <ProductCard {...product} />
    </Modal>
  );
}

export default ProductModal;
