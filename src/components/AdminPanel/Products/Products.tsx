import { useEffect, useState } from "react";

import AddProduct from "./AddProduct/AddProduct";
import ProductsList from "./ProductsList/ProductsList";
import CategoriesList from "../Procedures/CategoriesList/CategoriesList";

import styles from "./Products.module.css";
import Card from "@mui/material/Card";
import axios from "axios";
import { Category } from "../../../models/category";
import { Product } from "../../../models/product";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      const getProducts = async () => {
        const response = await axios.get(
          `http://localhost:4000/products/category/${selectedCategory._id}`
        );

        setProducts(response.data);
      };

      getProducts();
    }
  }, [selectedCategory]);

  const onCloseClickHandler = () => {
    setShowModal(false);
    setSelectedProduct({});
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSelectProduct = (product: Product) => {
    console.log(product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const updateProducts = ({ type, product}) => {
    if (type === "add") {
      setProducts((values) => [...values, product]);
    } else if (type === "edit") {
      const productIndex = products.findIndex((p) => p._id === product._id);

      const updatedProducts = products;
      updatedProducts[productIndex] = product;
      setProducts(updatedProducts);
    }
  };

  return (
    <>
      <CategoriesList type="products" selectCategory={handleSelectCategory} />
      
      {selectedCategory && (
        <>
          <h1>Категория - {selectedCategory.name}</h1>
          <div className={styles.mainContainer}>
            <div className={styles.addContainer}>
              <Card
                className={styles.btnContainer}
                onClick={() => setShowModal(true)}
              >
                +
              </Card>
            </div>
            <div className={styles.productsContainer}>
              <AddProduct
                show={showModal}
                hide={onCloseClickHandler}
                category={selectedCategory}
                selectedProduct={selectedProduct}
                updateProducts={updateProducts}
              />
              <ProductsList
                id={selectedCategory._id}
                products={products}
                selectProduct={handleSelectProduct}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
