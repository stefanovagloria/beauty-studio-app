import { useEffect, useState, useRef } from "react";
import axios from "axios";

import SelectItem from "../../Products/SelectProduct/SelectItem";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styles from "./AddProcedure.module.scss";
import { styled } from "@mui/material/styles";

import productsImage from "../../../../assets/productsImage.png";
import { Procedure } from "../../../../models/procedure";
import { Category } from "../../../../models/category";
import { Input, TextField } from "@mui/material";

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

interface AddProcedureProps {
  show: boolean;
  hide: () => void;
  category: Category;
  selectedProcedure: Procedure;
  updateProcedures: (params: { type: string; procedure: Procedure }) => void;
  showLoaderHandler: (value: boolean) => void;
}

const AddProcedure: React.FC<AddProcedureProps> = ({
  show,
  hide,
  category,
  selectedProcedure,
  updateProcedures,
  showLoaderHandler,
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
  const [showProcedures, setShowProcedures] = useState<boolean>(false);
  const [selectedRelatedProceduresIds, setSelectedRelatedProceduresIds] =
    useState<string[]>([]);
  const [showInputs, setShowInputs] = useState(false);
  const [currentInputs, setCurrentInputs] = useState({ key: "", value: "" });

  const inputRef = useRef(null);

  useEffect(() => {
    if (Object.keys(selectedProcedure).length !== 0) {
      setProcedureValues(selectedProcedure);
    } else {
      resetProcedureValues();
    }
  }, [selectedProcedure]);

  const resetProcedureValues = () => {
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
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;

    if (inputName !== "photos") {
      setProcedureValues((values) => ({
        ...values,
        [inputName]: event.target.value,
      }));
    } else {
      setProcedureValues((values) => ({
        ...values,
        [inputName]: [...values[inputName], event.target.files[0]],
      }));
    }
  };

  const onCharacteristicsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const onCharacteristicsRemove = (index: number) => {
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
    setCurrentInputs({ key: "", value: "" });
    setShowInputs(false);
  };

  const handleImageUpload = async () => {
    if (currentPhotos.length === 0) return;

    const formData = new FormData();
    currentPhotos.forEach((image) => {
      formData.append("images", image);
    });

    try {
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

        // Update state with uploaded image URLs
        return new Promise((resolve) => {
          setProcedureValues((prevValues) => {
            const updatedPhotos = [...prevValues.photos, ...imageURLs];

            resolve({
              ...prevValues,
              photos: updatedPhotos,
            });

            return {
              ...prevValues,
              photos: updatedPhotos,
            };
          });
        });
      } else {
        console.error("Invalid response data:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading images:", error.message);
      return null;
    }
  };

  const onAddSubmitHandler = async (e) => {
    e.preventDefault();
    showLoaderHandler(true);

    const updatedValues = await handleImageUpload();

    if (!updatedValues) return;

    try {
      const postResponse = await axios.post(
        "http://localhost:4000/procedures",
        updatedValues // Send updated procedureValues with image URLs
      );

      resetProcedureValues();
      hide();
      updateProcedures({ type: "add", procedure: postResponse.data });
    } catch (error) {
      console.error("Error adding procedure:", error.message);
    }
    showLoaderHandler(false);
  };

  const onEditSubmitHandler = async (e) => {
    e.preventDefault();

    const updatedValues = await handleImageUpload();

    if (!updatedValues) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/procedures/${selectedProcedure._id}`,
        updatedValues
      );

      resetProcedureValues();
      hide();
      updateProcedures({ type: "edit", procedure: response.data });
    } catch (error) {
      console.error("Error editing procedure:", error.message);
    }
  };

  const showAllProcedures = () => {
    setShowProcedures(true);
  };

  const hideAllProcedures = () => {
    setShowProcedures(false);
  };

  const addToRelatedProcedures = (procedure: Procedure) => {
    if (!selectedRelatedProceduresIds.includes(procedure._id)) {
      setProcedureValues((values) => ({
        ...values,
        relatedProducts: [...values.relatedProducts, procedure],
      }));
      setSelectedRelatedProceduresIds((ids) => [...ids, procedure._id]);
    } else {
      const updatedRelatedProducts = procedureValues.relatedProducts.filter(
        (p) => p._id !== procedure._id
      );
      setProcedureValues((values) => ({
        ...values,
        relatedProducts: updatedRelatedProducts,
      }));
      const updatedIds = selectedRelatedProceduresIds.filter(
        (id) => id !== procedure._id
      );
      setSelectedRelatedProceduresIds(updatedIds);
    }
  };

  const onImageChangeHandler = (e) => {
    const selectedImage = e.target.files[0];
    setCurrentPhotos((prevPhotos) => [...prevPhotos, selectedImage]);
  };

  return (
    <Dialog
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
            <Input
              placeholder="Име на процедура"
              color="secondary"
              style={{ textAlign: "center", width: "200px" }}
              id="name"
              name="name"
              value={procedureValues.name}
              onChange={onChangeHandler}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="photos"> Снимки на процедурата</label>
            <input
              ref={inputRef}
              id="photos"
              name="photos"
              type="file"
              hidden
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.photosContainer}>
              {procedureValues.photos.map((p) => (
                <img src={productsImage} className={styles.photoCard} />
              ))}
              <div>
                <AddButton onClick={() => inputRef.current.click() }>
                  +
                </AddButton>
              </div>
            </div>

          {procedureValues.photos.length > 0 &&
            procedureValues.photos.map((photo, index) => (
              <span key={index}>{photo.name || photo}</span>
            ))}
          <div>
            <label htmlFor="price">Цена:</label>
            <Input
              color="secondary"
              style={{ textAlign: "center", width: "70px" }}
              id="price"
              name="price"
              value={procedureValues.price || ""}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="promoPrice">Промоционална цена:</label>
            <Input
              color="secondary"
              style={{ textAlign: "center", width: "70px" }}
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
                        <span>{ch.key}</span>
                        <span>:</span>
                        <span>{ch.value}</span>
                        <Button
                          onClick={() => onCharacteristicsRemove(index)}
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
                onClick={() => setShowInputs(true)}
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
                    onClick={onCharacteristicsAddSave}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                      borderRadius: "0.5em",
                    }}
                    disabled={
                      currentInputs.key === "" || currentInputs.value === ""
                    }
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
              label="Въведи описание на процедурата.."
              multiline
              maxRows={5}
              value={procedureValues.description}
              onChange={onChangeHandler}
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
