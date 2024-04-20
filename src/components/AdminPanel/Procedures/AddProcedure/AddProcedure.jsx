import { useEffect, useState } from "react";
import axios from "axios";

import ImageUpload from "./ImageUpload";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styles from "./AddProcedure.module.css";
import { styled } from "@mui/material/styles";

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

  const onImageAdd = (image) => {
    const updatedPhotosValues = procedureValues.photos;
    updatedPhotosValues.push(image);
    setProcedureValues((values) => ({
      ...values,
      photos: updatedPhotosValues,
    }));
  };

  const onAddSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/admin/procedures",
      procedureValues
    );

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
      `http://localhost:4000/admin/procedures/${selectedProcedure._id}`,
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
    try {
      const formData = new FormData();
      procedureValues.photos.forEach((image, index) => {
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

      console.log("Images uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error.message);
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
          <ImageUpload addImage={onImageAdd} />
          {procedureValues.photos.map((photos, index) => (
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

              <Button onClick={() => setShowInputs(true)}>Add</Button>

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
            <div>
              <Button>+</Button>
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
    </Dialog>
  );
};

export default AddProcedure;
