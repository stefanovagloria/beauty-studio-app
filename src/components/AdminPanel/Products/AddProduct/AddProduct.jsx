import styles from "./AddProduct.module.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Input from "@mui/material/Input";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SelectProduct from "../SelectProduct/SelectProduct";

import { styled } from "@mui/material/styles";
import productsImage from "../../../../assets/productsImage.png";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(148, 72, 220)",
  maxWidth: "15em",
  color: "white",
  padding: "1em 1.5em",
  margin: "0em 0.7em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(190, 90, 220)",
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: "0.5em",
  padding: "3.3em",
  maxWidth: "7em",
  height: "auto",
  fontWeight: "bold",
}));

const AddProduct = ({
  show,
  hide,
  category,
  selectedProduct,
  updateProducts,
}) => {
  const [productsValues, setProductsValues] = useState({
    category: category._id,
    name: "",
    photos: [],
    price: "",
    promoPrice: "",
    characteristics: [{ key: "", value: "" }],
    description: "",
    relatedProducts: [],
  });

  const inputRef = useRef(null);

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
        category: category._id,
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

    const characteristics = productsValues.characteristics;
    const updatedCharacteristics = characteristics.filter((ch) => ch.key !== '');
    console.log(updatedCharacteristics)

    setProductsValues((values) => ({...values, characteristics: updatedCharacteristics}))

    const response = await axios.post(
      "http://localhost:4000/products",
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
      `http://localhost:4000/products/${selectedProduct._id}`,
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
      const updatedRelatedProducts = relatedProductsArr.filter(
        (p) => p._id !== product._id
      );
      setProductsValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
      const updatedIds = selectedRelatedProductsIds.filter(
        (id) => id !== product._id
      );
      setSelectedRelatedProductsIds(updatedIds);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "700px",
      }}
    >
      <DialogContent className={styles.container}>
        <form onSubmit={selectedProduct._id ? onEditHandler : onSubmitHandler}>
          <div>
            <h3 className={styles.categoryName}>{category.name}</h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              placeholder="Име на продукт"
              color="secondary"
              style={{ textAlign: "center", width: "200px" }}
              id="name"
              name="name"
              value={productsValues.name}
              onChange={onChangeHandler}
              className={styles.productName}
              required
            />
          </div>
          <div>
            <label htmlFor="photos"> Снимки на продукта</label>
            <input
              ref={inputRef}
              id="photos"
              name="photos"
              type="file"
              hidden
              onChange={onChangeHandler}
            />
            <div className={styles.photosContainer}>
              {productsValues.photos.map((p) => (
                <img src={productsImage} className={styles.photoCard} />
              ))}
              <div>
                <AddButton onClick={() => inputRef.current.click()}>
                  +
                </AddButton>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "1em" }}>
            <label htmlFor="price">Цена:</label>
            <Input
              color="secondary"
              style={{ textAlign: "center", width: "70px" }}
              id="price"
              name="price"
              value={productsValues.price}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div style={{ paddingTop: "1em" }}>
            <label htmlFor="promoPrice">Промоционална цена:</label>
            <Input
              color="secondary"
              style={{ textAlign: "center", width: "70px" }}
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
                        <span>{ch.key}</span>
                        <span>:</span>
                        <span>{ch.value}</span>
                        <Button
                          onClick={() => onRemove(index)}
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid black",
                            borderRadius: "0.5em",
                          }}
                        >
                          X
                        </Button>
                      </div>
                    )
                )}
              <Button
                onClick={onAddClickHandler}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "0.5em",
                  fontWeight: "bold",
                }}
              >
                +
              </Button>

              {showInputs && (
                <div>
                  <Input
                    value={currentInputs.key}
                    color="secondary"
                    name="key"
                    onChange={(e) => onCharacteristicsChange(e)}
                    style={{ marginRight: "1em", width: "12em" }}
                    
                  />
                  <Input
                    value={currentInputs.value}
                    color="secondary"
                    name="value"
                    onChange={(e) => onCharacteristicsChange(e)}
                    style={{ marginRight: "1em", width: "7em" }}
                    
                  />
                  <Button
                    onClick={onSave}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                      borderRadius: "0.5em",
                    }}
                    disabled={currentInputs.key === '' || currentInputs.value === ''}
                  >
                    Запази
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.fields}>
            <TextField
              id="description"
              color="secondary"
              name="description"
              label="Въведи описание на продукта.."
              multiline
              maxRows={5}
              value={productsValues.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.fields}>
            Сходни продукти:
            <div className={styles.relatedProductsContainer}>
              {productsValues.relatedProducts.map((p) => (
                <img key={p._id} src={productsImage} className={styles.relatedProductImg} />
              ))}
              <Button
                style={{
                  height: "100%",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "0.5em",
                  fontWeight: "bold",
                }}
                onClick={showAllProducts}
              >
                +
              </Button>
            </div>
          </div>
          <DialogActions>
            <CustomButton autoFocus onClick={hide}>
              Отказ
            </CustomButton>
            <CustomButton autoFocus type="submit">
              Запази продукт
            </CustomButton>
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
