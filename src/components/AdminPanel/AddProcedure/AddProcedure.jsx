import styles from "./AddProcedure.module.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

const AddProcedure = ({ show, hide, category }) => {
  const [procedureValues, setProcedureValues] = useState({
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

  const onRemove = (index) => {
    const updatedCharacteristics = [...procedureValues.characteristics];
    updatedCharacteristics.splice(index, 1);

    setProcedureValues((values) => ({
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
    setProcedureValues((values) => ({
      ...values,
      characteristics: [...values.characteristics, currentInputs],
    }));
    setCurrentInputs((inputs) => ({ key: "", value: "" }));
    setShowInputs(false);
  };

  const onChangeHandler = (e) => {
    const inputName = e.target.name;

    if (inputName !== "photos") {
      setProcedureValues((values) => ({
        ...values,
        [inputName]: e.target.value,
      }));
    } else {
      setProcedureValues((values) => ({
        ...values,
        [inputName]: [...values[inputName], e.target.files[0]],
      }));
    }
  };

  const onAddClickHandler = () => {
    setShowInputs(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <form className={styles.container} onSubmit={onSubmitHandler}>
          <div className={styles.fields}>
            <label htmlFor="name">Име на процедура:</label>
            <input
              id="name"
              name="name"
              value={procedureValues.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.category}>{category.name}</div>
          <div className={styles.fields}>
            <label htmlFor="photos"> Снимки на процедурата</label>
            <input
              id="photos"
              name="photos"
              type="file"
              onChange={onChangeHandler}
            />
            {procedureValues.photos.map((photos, index) => (
              <span key={index}>{photos.name}</span>
            ))}
          </div>
          <div>
            <label htmlFor="price">Цена:</label>
            <input
              id="price"
              name="price"
              value={procedureValues.price}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="promoPrice">Промоционална цена:</label>
            <input
              id="promoPrice"
              name="promoPrice"
              value={procedureValues.promoPrice}
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
              value={procedureValues.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.fields}>
            Сходни продукти:
            <div>
              <Button>+</Button>
            </div>
          </div>
          <DialogActions>
            <Button autoFocus onClick={hide}>
              Отказ
            </Button>
            <Button onClick={hide} autoFocus type="submit">
              Запази процедура
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProcedure;
