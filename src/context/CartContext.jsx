import { createContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productsArr = localStorage.getItem("orderedItems");
    if (productsArr) {
      const products = JSON.parse(productsArr);
      const total = products.reduce((acc, product) => {
        return (acc += product.price * product.quantity);
      }, 0);
      setItems(products);
      setTotal(total);
      console.log("CartContext re-render")
    }
  }, []);

  const addItem = (product, quantity) => {

    console.log(product, quantity)

    let orderedItemsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedItemsArr ? JSON.parse(orderedItemsArr) : [];

    const productIndex = orderedItems.findIndex((i) => i._id === product._id);

    if (productIndex !== -1) {
      const currentProduct = orderedItems.find((i) => i._id === product._id);
      console.log(currentProduct);
      orderedItems.splice(productIndex, 1, {
        ...product,
        quantity: Number(currentProduct.quantity) + Number(quantity),
      });
    } else {
      orderedItems.push({ ...product, quantity: Number(quantity) });
    }

    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));

    setItems((itemValues) => [...itemValues, product]);
    setTotal(
      (totalPrice) => totalPrice + product.price *quantity
    );
  };

  const removeItem = (product) => {
    const itemValues = items;
    const updatedValues = itemValues.filter((p) => p._id !== product._id);
    setItems(updatedValues);
    setTotal((totalPrice) => totalPrice - product.price);
  };

  const getItemsAndTotalPrice = () =>{
    return {items, total};
  }
  return (
    <CartContext.Provider value={{ addItem, removeItem, getItemsAndTotalPrice, items, total }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
