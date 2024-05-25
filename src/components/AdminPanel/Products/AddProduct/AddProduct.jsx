import styles from "./AddProduct.module.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectProduct from "../SelectProduct/SelectProduct";

const AddProduct = ({
  show,
  hide,
  categoryId,
  selectedProduct,
  updateProducts,
}) => {
  const [productsValues, setProductsValues] = useState({
    category: categoryId,
    name: "",
    photos: [],
    price: "",
    promoPrice: "",
    characteristics: [{ key: "", value: "" }],
    description: "",
    relatedProducts: [],
  });

  const [showInputs, setShowInputs] = useState(false);
  const [currentInputs, setCurrentInputs] = useState({ key: "", value: "" });
  const [showProducts, setShowProducts] = useState(false);
  const [selectedRelatedProductsIds, setSelectedRelatedProductsIds] = useState(
    []
  );

  useEffect(() => {
    if (Object.keys(selectedProduct).length !== 0) {
      setProductsValues(selectedProduct);
      setCurrentInputs(selectedProduct.characteristics);
    } else {
      setProductsValues({
        category: categoryId,
        name: "",
        photos: [],
        price: "",
        promoPrice: "",
        characteristics: [{ key: "", value: "" }],
        description: "",
        relatedProducts: [],
      });
    }
  }, [selectedProduct]);

  const onRemove = (index) => {
    const updatedCharacteristics = [...productsValues.characteristics];
    updatedCharacteristics.splice(index, 1);

    setProductsValues((values) => ({
      ...values,
      characteristics: updatedCharacteristics,
    }));
  };

  const onCharacteristicsChange = (e) => {
    setCurrentInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = () => {
    setProductsValues((values) => ({
      ...values,
      characteristics: [...values.characteristics, currentInputs],
    }));
    setCurrentInputs((inputs) => ({ key: "", value: "" }));
    setShowInputs(false);
  };

  const onChangeHandler = (e) => {
    const inputName = e.target.name;

    if (inputName !== "photos") {
      setProductsValues((values) => ({
        ...values,
        [inputName]: e.target.value,
      }));
    } else {
      setProductsValues((values) => ({
        ...values,
        [inputName]: [...values[inputName], e.target.files[0]],
      }));
    }
  };

  const onAddClickHandler = () => {
    setShowInputs(true);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/admin/products",
      productsValues
    );

    setProductsValues({
      name: "",
      photos: [],
      price: "",
      promoPrice: "",
      characteristics: [{ key: "", value: "" }],
      description: "",
      relatedProducts: [],
    });

    hide();
    updateProducts({ type: "add", product: response.data });
  };

  const onEditHandler = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `http://localhost:4000/admin/products/${selectedProduct._id}`,
      productsValues
    );

    setProductsValues({
      name: "",
      photos: [],
      price: "",
      promoPrice: "",
      characteristics: [{ key: "", value: "" }],
      description: "",
      relatedProducts: [],
    });

    hide();
    updateProducts({ type: "edit", product: response.data });
  };

  const showAllProducts = () => {
    setShowProducts(true);
  };

  const hideAllProducts = () => {
    setShowProducts(false);
  };

  const addToRelatedProducts = (product) => {
    if (!selectedRelatedProductsIds.includes(product._id)) {
      const relatedProductsArr = productsValues.relatedProducts;
      const updatedRelatedProducts = [...relatedProductsArr, product];
      setProductsValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
      setSelectedRelatedProductsIds((ids) => [...ids, product._id]);
    } else {
      const relatedProductsArr = productsValues.relatedProducts;
      const updatedRelatedProducts = relatedProductsArr.filter((p) => p._id !== product._id);
      setProductsValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
     const updatedIds = selectedRelatedProductsIds.filter((id) => id !== product._id);
     setSelectedRelatedProductsIds(updatedIds);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <form
          className={styles.container}
          onSubmit={selectedProduct._id ? onEditHandler : onSubmitHandler}
        >
          <div className={styles.fields}>
            <label htmlFor="name">Име на процедура:</label>
            <input
              id="name"
              name="name"
              value={productsValues.name}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.fields}>
            <label htmlFor="photos"> Снимки на процедурата</label>
            <input
              id="photos"
              name="photos"
              type="file"
              onChange={onChangeHandler}
            />
            {productsValues.photos.map((photos, index) => (
              <span key={index}>{photos.name}</span>
            ))}
          </div>
          <div>
            <label htmlFor="price">Цена:</label>
            <input
              id="price"
              name="price"
              value={productsValues.price}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="promoPrice">Промоционална цена:</label>
            <input
              id="promoPrice"
              name="promoPrice"
              value={productsValues.promoPrice || ""}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.fields}>
            <label>Характеристики:</label>
            <div>
              {productsValues.characteristics.length > 0 &&
                productsValues.characteristics.some((c) => c.value !== "") &&
                productsValues.characteristics.map(
                  (ch, index) =>
                    ch.key !== "" && (
                      <div key={index}>
                        <input
                          value={ch.key}
                          onChange={(e) =>
                            onCharacteristicsChange(
                              e,
                              index,
                              e.target.value,
                              ch.value
                            )
                          }
                        />
                        <input
                          value={ch.value}
                          onChange={(e) =>
                            onCharacteristicsChange(
                              e,
                              index,
                              ch.key,
                              e.target.value
                            )
                          }
                        />
                        <Button onClick={() => onRemove(index)}>Remove</Button>
                      </div>
                    )
                )}

              <Button onClick={onAddClickHandler}>Add</Button>

              {showInputs && (
                <div>
                  <input
                    value={currentInputs.key}
                    name="key"
                    onChange={(e) => onCharacteristicsChange(e)}
                  />
                  <input
                    value={currentInputs.value}
                    name="value"
                    onChange={(e) => onCharacteristicsChange(e)}
                  />
                  <Button onClick={onSave}>Save</Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.fields}>
            <label htmlFor="description">Описание на продукт:</label>
            <textarea
              id="description"
              name="description"
              value={productsValues.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.fields}>
            Сходни продукти:
            <div>
              <Button onClick={showAllProducts}>+</Button>
            </div>
          </div>
          <DialogActions>
            <Button autoFocus onClick={hide}>
              Отказ
            </Button>
            <Button autoFocus type="submit">
              Запази продукт
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      {showAllProducts && (
        <SelectProduct
          show={showProducts}
          hide={hideAllProducts}
          addToRelatedProducts={addToRelatedProducts}
          selectedRelatedProductsIds={selectedRelatedProductsIds}
        />
      )}
    </Dialog>
  );
};

export default AddProduct;
