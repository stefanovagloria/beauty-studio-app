import { useEffect, useState } from "react";

import AddProduct from "./AddProduct/AddProduct";
import ProductsList from "./ProductsList/ProductsList";
import CategoriesList from "../Procedures/CategoriesList/CategoriesList";

import Card from "@mui/material/Card";
import styles from "./Products.module.css";
import axios from "axios";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(selectedCategory && selectedCategory._id){
      const getProducts = async () => {
        const response = await axios.get(
          `http://localhost:4000/admin/products/${selectedCategory._id}`
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectProduct = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const updateProducts = (type, product) =>{
    if(type === "add"){
      setProducts((products) => ([...products, product]));
    } else if(type === "edit"){
      const productIndex = products.findIndex((p) => p._id === product._id);
      const updatedProducts = products;
      updatedProducts[productIndex] = product;

      setProducts(() => updatedProducts);
    }
  }

  return (
    <>
      <CategoriesList type="products" selectCategory={handleSelectCategory} />
      {selectedCategory && (
        <>
          <h1>Категория - {selectedCategory.name}</h1>
          <div className={styles.container}>
            <Card
              className={styles.btnContainer}
              onClick={() => setShowModal(true)}
            >
              <span className={styles.btn}>+</span>
            </Card>
            <AddProduct
              show={showModal}
              hide={onCloseClickHandler}
              categoryId={selectedCategory && selectedCategory._id ? selectedCategory._id : ""}
              selectedProduct={selectedProduct}
              updateProducts={updateProducts}
            />
            <ProductsList
              id={selectedCategory._id}
              products={products}
              selectProduct={handleSelectProduct}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
