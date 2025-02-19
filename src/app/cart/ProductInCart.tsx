import Image from "next/image";
import { ProductFlat } from "./page";
import { getProduct } from "../products/[id]/page";

// redirect()
// useRouter().push()

async function ProductInCart({ productId, quantity }: ProductFlat) {
  const product = await getProduct(productId.toString());
  if (product == null) return null;

  const { category, description, id, image, price, title } = product!;
  return (
    <tr>
      <td>
        <Image
          src={image}
          alt="상품 이미지"
          width={70}
          height={70}
        />
      </td>
      <td>{title}</td>
      <td>{`${quantity}개`}</td>
      <td>{`${price}원`}</td>
      <td>{`${Number(price) * quantity}원`}</td>
    </tr>
  );
}

export default ProductInCart;
