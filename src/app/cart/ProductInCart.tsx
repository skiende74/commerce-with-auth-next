import { Product } from "../products/model";
import { ProductFlat } from "./page";

async function getProduct(productId: number) {
  const data = await fetch(`https://fakestoreapi.com/products/${productId}`);
  return (await data.json()) as Product;
}

async function ProductInCart({ productId, quantity }: ProductFlat) {
  const product = await getProduct(productId);
  const { category, description, id, image, price, title } = product;
  return (
    <li>
      {title}
      {description}
    </li>
  );
}

export default ProductInCart;
