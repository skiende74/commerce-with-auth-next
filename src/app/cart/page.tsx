import ProductInCart from "./ProductInCart";

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: ProductFlat[];
}

export interface ProductFlat {
  productId: number;
  quantity: number;
}

export async function getCarts() {
  const data = await fetch("https://fakestoreapi.com/carts/user/2");
  return (await data.json()) as Cart[];
}

async function page() {
  const carts = await getCarts();
  const firstCart = carts[0];

  return (
    <div>
      <h2 className="text-center">장바구니</h2>
      <div>
        <ul>
          {firstCart.products.map((product) => (
            <ProductInCart
              key={product.productId}
              {...product}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
