"use server";

import { getProducts } from "../products/page";



export async function changeQuantity(cartId: number, productId: number, quantity: number) {
  "use server";
  // FIXME : userId 2로 하드코딩 한 것 제거해야 함.
  const products = await getProducts();
  const newProducts = products.map((product) => (product.id === productId ? { ...product, quantity } : product));
  fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: "PUT",
    body: JSON.stringify({ userId: 2, date: Date.now().toString(), products: newProducts }),
  });
}
