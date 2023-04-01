import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import SingleProduct from "../components/SingleProduct";
import styles from "./Products.module.scss";
import FiltersBar from "../components/FiltersBar";
export const Products = observer(() => {
  const {
    productStore: { getProducts, products, getProductCategories },
  } = useStore();

  useEffect(() => {
    getProducts();
    getProductCategories();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <FiltersBar />
        <div className={styles.Grid}>
          {products.map((elem: any) => {
            return <SingleProduct key={elem.id} {...elem} />;
          })}
        </div>
      </div>
    </>
  );
});
