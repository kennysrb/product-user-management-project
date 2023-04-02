import axios from "axios";
import { cast, types } from "mobx-state-tree";

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
  title: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  price: types.maybeNull(types.number),
  discountPercentage: types.maybeNull(types.number),
  rating: types.maybeNull(types.number),
  stock: types.maybeNull(types.number),
  brand: types.maybeNull(types.string),
  category: types.maybeNull(types.string),
  thumbnail: types.maybeNull(types.string),
  images: types.maybeNull(types.array(types.string)),
});
export const ProductStore = types
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
      limitProducts(limit: number) {
        axios
          .get(
            `https://dummyjson.com/products?limit=${limit}&select=title,price`
          )
          .then((res) => this.setProducts(res.data.products))
          .catch((error) => console.error("Error:", error));
      },
    };
  });
