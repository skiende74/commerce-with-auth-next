import ProductInCart from "./ProductInCart";

export interface Cart {
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
        <table className="table">
          <thead>
            <tr>
              <td>상품</td>
              <td>상품명</td>
              <td>수량</td>
              <td>가격</td>
              <td>총 가격</td>
            </tr>
          </thead>
          <tbody>
            {firstCart.products.map((product) => (
              <ProductInCart
                key={product.productId}
                {...product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
