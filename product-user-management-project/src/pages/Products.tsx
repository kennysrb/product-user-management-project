import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import SingleProduct from "../components/SingleProduct";
import styles from "./Products.module.scss";
export const Products = observer(() => {
  const {
    productStore: { getProducts, products },
  } = useStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <div className={styles.Grid}>
          {products.map((elem: any) => {
            return <SingleProduct key={elem.id} {...elem} />;
          })}
        </div>
      </div>
    </>
  );
});
