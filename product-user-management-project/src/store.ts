import axios from "axios";
import { Instance, cast, flow, types } from "mobx-state-tree";
import { createContext, useContext } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export const ProductModel = types.model("ProductModel", {
  id: types.identifierNumber,
  title: types.string,
  description: types.string,
  price: types.number,
  discountPercentage: types.number,
  rating: types.number,
  stock: types.number,
  brand: types.string,
  category: types.string,
  thumbnail: types.string,
  images: types.array(types.string),
});

const ProductStore = types
  .model({
    products: types.array(ProductModel),
  })
  .views((self) => ({}))
  .actions((self) => {
    return {
      setProducts(products: Product[]) {
        self.products = cast(products.map((p) => ProductModel.create(p)));
      },
      async getProducts() {
        try {
          const response = await axios.get("https://dummyjson.com/products");
          this.setProducts(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
    };
  });

export const RootStore = types.model({
  productStore: ProductStore,
});

let _store: any = null;

export function initializeStore() {
  _store = RootStore.create({
    productStore: { products: [] },
  });
  return _store;
}

export type RootInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;

export function useStore(): Instance<typeof RootStore> {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as RootInstance;
}
