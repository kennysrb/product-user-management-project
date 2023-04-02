import axios from "axios";
import { Instance, cast, flow, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { UserStore } from "./models/User";
import { CartStore } from "./models/Cart";
import { ProductStore } from "./models/Product";

export const RootStore = types.model({
  productStore: ProductStore,
  userStore: UserStore,
  cartStore: CartStore,
});

let _store: any = null;

export function initializeStore() {
  _store = RootStore.create({
    productStore: { products: [] },
    userStore: { users: [] },
    cartStore: { carts: [] },
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
