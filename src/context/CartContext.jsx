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
      console.log("CartContext re-render");
    }
  }, []);

  const addItem = (product, quantity) => {
    let orderedItemsArr = localStorage.getItem("orderedItems");
    let orderedItems = orderedItemsArr ? JSON.parse(orderedItemsArr) : [];

    const productIndex = orderedItems.findIndex((i) => i._id === product._id);

    if (productIndex !== -1) {
      const currentProduct = orderedItems.find((i) => i._id === product._id);
      orderedItems.splice(productIndex, 1, {
        ...product,
        quantity: Number(currentProduct.quantity) + Number(quantity),
      });
    } else {
      orderedItems.push({ ...product, quantity: Number(quantity) });
    }

    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));

    const updatedTotal = orderedItems.reduce((acc, product) => {
      return (acc += product.price * product.quantity);
    }, 0);

    setItems(orderedItems);
    setTotal(updatedTotal);
  };

  const removeItem = (productId) => {
    const updatedItems = items.filter((p) => p._id !== productId);
    const updatedTotal = updatedItems.reduce((acc, product) => {
      return (acc += product.price * product.quantity);
    }, 0);

    localStorage.setItem("orderedItems", JSON.stringify(updatedItems));

    setItems(updatedItems);
    setTotal(updatedTotal);
  };

  const updateItem = (e, itemId) => {
    const value = e.target.value;

    if (value > 0) {
      const productIndex = items.findIndex((p) => p._id === itemId);

      const updatedProducts = [...items];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: value,
      };

      setItems(updatedProducts);
      localStorage.setItem("orderedItems", JSON.stringify(updatedProducts));

      const total = updatedProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(total);
    }
  };

  const getItemsAndTotalPrice = () => {
    return { items, total };
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        getItemsAndTotalPrice,
        updateItem,
        items,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
