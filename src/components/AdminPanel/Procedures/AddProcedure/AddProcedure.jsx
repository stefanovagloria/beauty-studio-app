import { useEffect, useState } from "react";
import axios from "axios";

import ImageUpload from "./ImageUpload";
import SelectItem from "../../Products/SelectProduct/SelectItem";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styles from "./AddProcedure.module.scss";
import { styled } from "@mui/material/styles";

import productsImage from "../../../../assets/productsImage.png"

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

const AddProcedure = ({
  show,
  hide,
  category,
  selectedProcedure,
  updateProcedures,
}) => {
  const categoryId = category._id;

  const [procedureValues, setProcedureValues] = useState({
    category: categoryId,
    name: "",
    photos: [],
    price: "",
    promoPrice: "",
    characteristics: [{ key: "", value: "" }],
    description: "",
    relatedProducts: [],
  });

  const [currentPhotos, setCurrentPhotos] = useState([]);

  const [showProcedures, setShowProcedures] = useState(false);
  const [selectedRelatedProceduresIds, setSelectedRelatedProceduresIds] = useState(
    []
  );

  useEffect(() => {
    if (Object.keys(selectedProcedure).length !== 0) {
      setProcedureValues(selectedProcedure);
    } else {
      setProcedureValues({
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
  }, [selectedProcedure]);

  const [showInputs, setShowInputs] = useState(false);

  const [currentInputs, setCurrentInputs] = useState({ key: "", value: "" });

  const onChangeHandler = (e) => {
    const inputName = e.target.name;
    setProcedureValues((values) => ({
      ...values,
      [inputName]: e.target.value,
    }));
  };

  const onCharacteristicsChange = (e) => {
    console.log(e.target);
    setCurrentInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onCharacteristicsRemove = (index) => {
    const updatedCharacteristics = [...procedureValues.characteristics];
    updatedCharacteristics.splice(index, 1);

    setProcedureValues((values) => ({
      ...values,
      characteristics: updatedCharacteristics,
    }));
  };

  const onCharacteristicsAddSave = () => {
    setProcedureValues((values) => ({
      ...values,
      characteristics: [...values.characteristics, currentInputs],
    }));
    setCurrentInputs((inputs) => ({ key: "", value: "" }));
    setShowInputs(false);
  };

  const onAddSubmitHandler = async (e) => {

    e.preventDefault();
    await handleImageUpload();

    setProcedureValues({
      category: category._id,
      name: "",
      photos: [],
      price: "",
      promoPrice: "",
      characteristics: [{ key: "", value: "" }],
      description: "",
      relatedProducts: [],
    });

    hide();
    updateProcedures({ type: "add", procedure: response.data });
  };

  const onEditSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:4000/procedures/${selectedProcedure._id}`,
      procedureValues
    );

    setProcedureValues({
      category: category._id,
      name: "",
      photos: [],
      price: "",
      promoPrice: "",
      characteristics: [{ key: "", value: "" }],
      description: "",
      relatedProducts: [],
    });

    hide();
    updateProcedures({ type: "edit", procedure: response.data });
  };

  const handleImageUpload = async () => {
    setCurrentInputs([]);
    try {
        const formData = new FormData();
        currentPhotos.forEach((image, index) => {
            formData.append(`images`, image);
        });

        const response = await axios.post(
            "http://localhost:4000/admin/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.data.fileData && Array.isArray(response.data.fileData)) {
            const imageURLs = response.data.fileData.map((f) => f.downloadUrl);
            setProcedureValues((prevValues) => ({
                ...prevValues,
                photos: [...prevValues.photos, ...imageURLs],
            }));
            console.log(imageURLs)
            console.log("Updated procedureValues:", procedureValues);

            // Now that images are uploaded, proceed with sending POST request to procedures
            const postResponse = await axios.post(
                "http://localhost:4000/procedures",
                procedureValues // Send updated procedureValues with image URLs
            );

            console.log(`Response from POST - ${postResponse.data}`);
        } else {
            console.error("Invalid response data:", response.data);
        }
    } catch (error) {
        console.error("Error uploading images:", error.message);
    }
};

const showAllProcedures = () => {
  setShowProcedures(true);
};

const hideAllProcedures = () => {
  setShowProcedures(false);
};



  const onImageAdd = (image) => {
    const updatedPhotos = currentPhotos;
    updatedPhotos.push(image);

    setCurrentPhotos(updatedPhotos);
  };

  const addToRelatedProcedures = (product) => {
    console.log('procedures - addToRelatedProcedures')
    if (!selectedRelatedProceduresIds.includes(product._id)) {
      const relatedProductsArr = procedureValues.relatedProducts;
      const updatedRelatedProducts = [...relatedProductsArr, product];
      setProcedureValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
      setSelectedRelatedProceduresIds((ids) => [...ids, product._id]);
    } else {
      const relatedProductsArr = procedureValues.relatedProducts;
      const updatedRelatedProducts = relatedProductsArr.filter(
        (p) => p._id !== product._id
      );
      setProcedureValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
      const updatedIds = selectedRelatedProceduresIds.filter(
        (id) => id !== product._id
      );
      setSelectedRelatedProceduresIds(updatedIds);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent className={styles.dialog}>
        <form
          className={styles.container}
          onSubmit={
            selectedProcedure && selectedProcedure._id
              ? onEditSubmitHandler
              : onAddSubmitHandler
          }
        >
          <div className={styles.category}>{category.name}</div>
          <div className={`${styles.fields}`}>
            <label htmlFor="name" className={styles.name}>
              {" "}
              {`Име на процедура`}
            </label>
            <input
              id="name"
              name="name"
              value={procedureValues.name}
              onChange={onChangeHandler}
              className={styles.input}
              required
            />
          </div>
          <ImageUpload onImageAdd={onImageAdd} />
          {procedureValues.photos.length > 0 && procedureValues.photos.map((photos, index) => (
            <span key={index}>{photos.name}</span>
          ))}
          <div>
            <label htmlFor="price">Цена:</label>
            <input
              id="price"
              name="price"
              value={procedureValues.price || ""}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="promoPrice">Промоционална цена:</label>
            <input
              id="promoPrice"
              name="promoPrice"
              value={procedureValues.promoPrice || ""}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.fields}>
            <label>Характеристики:</label>
            <div>
              {procedureValues.characteristics.length > 0 &&
                procedureValues.characteristics.some((c) => c.value !== "") &&
                procedureValues.characteristics.map(
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
                        <Button onClick={() => onCharacteristicsRemove(index)}>
                          Remove
                        </Button>
                      </div>
                    )
                )}

              <CustomButton onClick={() => setShowInputs(true)}>Add</CustomButton>

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
                  <Button onClick={onCharacteristicsAddSave}>Save</Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.fields}>
            <label htmlFor="description">Описание на продукт:</label>
            <textarea
              id="description"
              name="description"
              value={procedureValues.description}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.fields}>
            Сходни продукти:
            <div className={styles.relatedProductsContainer}>
              {procedureValues.relatedProducts.map((p) => (
                <img
                  key={p._id}
                  src={productsImage}
                  className={styles.relatedProductImg}
                />
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
                onClick={showAllProcedures}
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
              Запази процедура
            </CustomButton>
          </DialogActions>
        </form>
      </DialogContent>
      {showProcedures && (
        <SelectItem
          type="procedures"
          show={showProcedures}
          hide={hideAllProcedures}
          addToRelatedItems={addToRelatedProcedures}
          selectedRelatedItems={selectedRelatedProceduresIds}
        />
      )}
    </Dialog>
  );
};

export default AddProcedure;
