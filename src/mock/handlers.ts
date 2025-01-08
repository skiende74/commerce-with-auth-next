import { Cart } from "@/app/cart/page";
import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("https://fakestoreapi.com/carts/user/2", () => {
    return HttpResponse.json([
      {
        id: 1,
        userId: 2,
        date: "2024-01-02",
        products: [
          { productId: 1, quantity: 2 },
          { productId: 9, quantity: 3 },
        ],
      },
    ] as Cart[]);
  }),
];
