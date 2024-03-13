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
    price: '',
    promoPrice: '',
    characteristics: [{ key: "", value: null }],
    description: "",
    relatedProducts: [],
  });

  const onRemove = (index) => {};

  const onCharacteristicsChange = (e) => {};

  const onChangeHandler = (e) => {
    const inputName = e.target.name;
    console.log(e.target.value)
    if (inputName !== "photos") {
      console.log('setValues..')
      setProcedureValues((values) => ({
        ...values,
        [inputName]: e.target.value,
      }));
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
        <form className={styles.container}>
          <div className={styles.fields}>
            <label htmlFor="name">Име на процедура:</label>
            <input
              id="name"
              name="name"
              value={procedureValues.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className={styles.category}>{category}</div>
          <div className={styles.fields}>
            <label htmlFor="photos"> Снимки на процедурата</label>
            <input
              id="photos"
              name="photos"
              type="file"
              onChange={onChangeHandler}
            />
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
              {procedureValues.length > 0 &&
                procedureValues.characteristics.map((ch, index) => (
                  <div key={index}>
                    <input
                      value={ch.key}
                      onChange={(e) =>
                        onCharacteristicsChange(index, e.target.value, ch.value)
                      }
                    />
                    <input
                      value={ch.value}
                      onChange={(e) =>
                        onCharacteristicsChange(index, ch.key, e.target.value)
                      }
                    />
                    <Button onClick={() => onRemove(index)}>Remove</Button>
                  </div>
                ))}
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
