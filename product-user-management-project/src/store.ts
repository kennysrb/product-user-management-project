import axios from "axios";
import { Instance, cast, flow, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import {UserStore} from "./models/User";

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
    singleProduct: types.maybeNull(ProductModel),
    productCategories: types.array(types.string),
  })
  .views((self) => ({}))
  .actions((self) => {
    return {
      setProducts(products: Product[]) {
        self.products = cast(products.map((p) => ProductModel.create(p)));
      },
      setSingleProduct(product: Product) {
        self.singleProduct = cast(product);
      },
      removeSingleProduct() {
        self.singleProduct = null;
      },
      setProductCategories(categories: string[]) {
        self.productCategories = cast(categories);
      },
      async getProducts() {
        try {
          const response = await axios.get("https://dummyjson.com/products");
          this.setProducts(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      async getSingleProduct(id: number) {
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/${id}`
          );
          this.setSingleProduct(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      async deleteProduct(id: number) {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete product.");
          }

          const data = await response.json();
          console.log(data);
          console.log("Product deleted successfully!");
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      },
      updateProduct(id: any, product: any) {
        fetch(`https://dummyjson.com/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      },
      searchProducts(search: string) {
        axios
          .get(`https://dummyjson.com/products/search?q=${search}`)
          .then((res) => this.setProducts(res.data.products))
          .catch((error) => console.error("Error:", error));
      },
      getProductCategories() {
        axios
          .get("https://dummyjson.com/products/categories")
          .then((res) => this.setProductCategories(res.data))
          .catch((error) => console.error("Error:", error));
      },
      getProductByCategory(category: string) {
        axios
          .get(`https://dummyjson.com/products/category/${category}`)
          .then((res) => this.setProducts(res.data.products))
          .catch((error) => console.error("Error:", error));
      },
      createNewProduct(product: {}) {
        axios
          .post("https://dummyjson.com/products/add", product)
          .then((res) => console.log(res.data))
          .catch((error) => console.error("Error:", error));
      },
    };
  });

export const RootStore = types.model({
  productStore: ProductStore,
  userStore: UserStore,
});

let _store: any = null;

export function initializeStore() {
  _store = RootStore.create({
    productStore: { products: [] },
    userStore: { users: [] },
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
