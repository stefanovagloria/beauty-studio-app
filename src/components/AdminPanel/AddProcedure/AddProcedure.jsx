import styles from "./AddProcedure.module.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddProcedure = ({ show, hide, category }) => {
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
            <label>Име на процедура:</label>
            <input />
          </div>
          <div className={styles.category}>{category}</div>
          <div className={styles.fields}>
            <label> Снимки на процедурата</label>
            <input type="file" />
          </div>
          <div >
            <label>Цена:</label>
            <input />
          </div>
          <div >
          <label>Промоционална цена:</label>
          <input />
          </div>
          <div className={styles.fields}>
          <label >Характеристики:</label>
          <input />
          </div>
          <div className={styles.fields}>
          <label>Описание на продукт:</label>
          <textarea />
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
