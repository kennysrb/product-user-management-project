import axios from "axios";
import { cast, types } from "mobx-state-tree";
export type CartProducts = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
};

interface Cart {
  id: number;
  products: CartProducts[];
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export const CartModel = types.model("CartModel", {
  id: types.identifierNumber,
  products: types.array(
    types.model("CartProducts", {
      id: types.identifierNumber,
      title: types.string,
      price: types.number,
      quantity: types.number,
      total: types.number,
      discountPercentage: types.number,
    })
  ),
  discountedTotal: types.number,
  userId: types.number,
  totalProducts: types.number,
  totalQuantity: types.number,
});

export const CartStore = types
  .model({
    carts: types.array(CartModel),
    singleCart: types.maybeNull(CartModel),
  })
  .views((self) => ({}))
  .actions((self) => {
    return {
      setCarts(cart: any[]) {
        self.carts = cast(cart.map((cart) => CartModel.create(cart)));
      },
      setSingleCart(cart: Cart) {
        self.singleCart = cast(cart);
      },
      removeSingleCart() {
        self.singleCart = null;
      },
      async getCarts() {
        try {
          const response = await axios.get("https://dummyjson.com/carts");
          this.setCarts(Array.from(response.data.carts));
        } catch (error) {
          console.error("Error fetching carts:", error);
        }
      },
      async getSingleCart(id: number) {
        try {
          const response = await axios.get(`https://dummyjson.com/carts/${id}`);
          this.setSingleCart(response.data);
        } catch (error) {
          console.error("Error fetching carts:", error);
        }
      },
      async deleteCart(id: number) {
        try {
          const response = await fetch(`https://dummyjson.com/carts/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete cart.");
          }

          const data = await response.json();
          console.log(data);
          console.log("Cart deleted successfully!");
        } catch (error) {
          console.error("Error deleting cart:", error);
        }
      },
      updateCart(id: any, cart: any) {
        fetch(`https://dummyjson.com/carts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      },
      createNewCart(cart: {}) {
        axios
          .post("https://dummyjson.com/carts/add", cart)
          .then((res) => console.log(res.data))
          .catch((error) => console.error("Error:", error));
      },
    };
  });
