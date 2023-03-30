import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";

export const Products = observer(() => {
  const {
    productStore: { getProducts, products },
  } = useStore();

  useEffect(() => {
    getProducts();
  }, []);
  console.log("test");

  return (
    <>
      <Header />
      <div>Products page</div>
      {products.map((m: any) => {
        return <p key={m.id}>{m.title}</p>;
      })}
    </>
  );
});
